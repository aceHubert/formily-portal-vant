import { computed } from 'vue-demi'
import Color from 'color-js'
import { warn } from '../__builtins__'

import type { Ref } from 'vue-demi'

interface IProps {
  themeVars?: {
    primary?: string
    primaryLighter?: string
    primaryLight?: string
    primaryDarker?: string
    primaryDark?: string
    [key: string]: string
  }
  scopedDataRequest?:
    | string
    | ((ids: Array<string | number>) => Promise<Record<string, boolean>>)
  dataRequest?: (config: {
    url: string
    params?: any
    body?: any
    [key: string]: any
  }) => Promise<any>
  [props: string]: any
}

export interface IUsePropsCalcPageLayout {
  (props: IProps): {
    props: Ref<
      Omit<IProps, 'scopedDataRequest'> & {
        scopedDataRequest: Extract<IProps['scopedDataRequest'], Function>
      }
    >
  }
}

const genColor = (color: string) => {
  const hslColor = Color(color).toHSL() as any
  const { saturation, lightness } = hslColor

  const dark = hslColor
    .setSaturation(saturation - 0.2)
    .setLightness(lightness - 0.1)
    .toString()
  const darker = hslColor.setLightness(0.2).toString()
  const light = hslColor
    .setSaturation(saturation - 0.2)
    .setLightness(lightness + 0.35)
    .toString()
  const lighter = hslColor.setLightness(0.96).toString()
  const shadowColor = hslColor.setAlpha(0.3).toString()
  return {
    base: hslColor,
    light,
    lighter,
    dark,
    darker,
    shadowColor,
  }
}

export const usePropsCalcPageLayout: IUsePropsCalcPageLayout = (props) => {
  const layoutProps = computed(() => {
    return {
      ...props,
      themeVars: props.themeVars
        ? Object.keys(props.themeVars).reduce((prev, curr) => {
            const colors = genColor(props.themeVars[curr])
            prev[curr] = colors.base
            prev[`${curr}Light`] = colors.light
            prev[`${curr}Lighter`] = colors.lighter
            prev[`${curr}Dark`] = colors.dark
            prev[`${curr}Darker`] = colors.darker
            return prev
          }, {})
        : {},
      dataRequest:
        props.dataRequest ??
        (() => {
          warn(
            process.env.NODE_ENV === 'production',
            'using default "scopedDataRequest" function, will return null!'
          )

          return Promise.resolve()
        }),
      scopedDataRequest: props.scopedDataRequest
        ? typeof props.scopedDataRequest === 'string'
          ? (ids: Array<string | number>) => {
              if (props.dataRequest) {
                props.dataRequest({
                  url: `${props.scopedDataRequest}${
                    (props.scopedDataRequest as string).indexOf('?') < 0
                      ? '?'
                      : '&'
                  }${ids.map((id) => `id[]=${id}`).join('&')}`,
                })
              } else {
                warn(
                  process.env.NODE_ENV === 'production',
                  'string type "scopedDataRequest" required "dataRequest" definetion, all results will be true!'
                )

                const result = ids.reduce((prev, curr) => {
                  prev[curr] = true
                  return prev
                }, {} as Record<string, boolean>)
                return Promise.resolve(result)
              }
            }
          : props.scopedDataRequest
        : (ids) => {
            warn(
              process.env.NODE_ENV === 'production',
              'using default "scopedDataRequest" function, all results will be true!'
            )

            const result = ids.reduce((prev, curr) => {
              prev[curr] = true
              return prev
            }, {} as Record<string, boolean>)
            return Promise.resolve(result)
          },
    }
  })

  return {
    props: layoutProps,
  }
}

import { computed } from 'vue-demi'
import tinycolor from 'tinycolor2'
import { warn } from '../__builtins__'

import type { Ref } from 'vue-demi'

interface IProps {
  themeVars?: {
    primary?: string
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
      IProps & {
        themeVars: {
          primary?: string
          primaryLighter?: string
          primaryLight?: string
          primaryDarker?: string
          primaryDark?: string
          [key: string]: string
        }
        scopedDataRequest: Extract<IProps['scopedDataRequest'], Function>
        dataRequest: IProps['dataRequest']
      }
    >
  }
}

const genColor = (colorInput: tinycolor.ColorInput) => {
  const color = tinycolor(colorInput)
  const { h, s, l } = color.toHsl()

  const base = color.toHexString()
  const dark = tinycolor({
    h,
    s: (s - 0.2) * 100,
    l: (l - 0.1) * 100,
  }).toHexString()
  const darker = tinycolor({ h, s, l: 20 }).toHexString()
  const light = tinycolor({
    h,
    s: (s - 0.2) * 100,
    l: (l + 0.35) * 100,
  }).toHexString()
  const lighter = tinycolor({ h, s, l: 96 }).toHexString()
  const shadowColor = color.clone().setAlpha(0.3).toString()
  return {
    base,
    light,
    lighter,
    dark,
    darker,
    shadowColor,
  }
}

export const usePropsCalcPageLayout: IUsePropsCalcPageLayout = (props) => {
  const layoutProps = computed(() => {
    const { primary, ...restVars } = props.themeVars || {}
    const primaryVars = {}
    if (primary) {
      const colors = genColor(primary)
      primaryVars['primary'] = colors.base
      primaryVars['primaryLight'] = colors.light
      primaryVars['primaryLighter'] = colors.lighter
      primaryVars['primaryDark'] = colors.dark
      primaryVars['primaryDarker'] = colors.darker
    }
    return {
      ...props,
      themeVars: {
        ...primaryVars,
        ...restVars,
      },
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

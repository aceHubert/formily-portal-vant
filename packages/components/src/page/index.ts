import kebabCase from 'lodash.kebabcase'
import Color from 'color-js'
import {
  defineComponent,
  getCurrentInstance,
  provide,
  computed,
  watch,
  onMounted,
} from 'vue-demi'
import { createForm } from '@formily/core'
import { FormProvider, h, useForm } from '@formily/vue'
import { stylePrefix } from '../__builtins__/configs'
import { parseStyleUnit } from '../__builtins__/shared'
import { PageConsumerProps } from './consumer-props'
import { PageInjectKey } from './useApi'

// Types
import type { VNode } from 'vue'

export interface PageProps {
  /**
   * Page root component, default: div
   * @type any (string | slot | VNode)
   */
  component?: any
  /**
   * container width, provide
   */
  containerWidth?: string | number
  /**
   * css vars
   */
  themeVars?: Record<string, string>
  /**
   * scopedDataResource mapper
   * use dataRequest() if is string type
   */
  scopedDataRequest?:
    | string
    | ((ids: Array<string | number>) => Promise<Record<string, boolean>>)
  /**
   * remoteDataResource request function
   */
  dataRequest?: (config: {
    url: string
    params?: any
    body?: any
    [key: string]: any
  }) => Promise<any>
}

export const Page = defineComponent<PageProps>({
  name: 'Page',
  props: {
    component: {},
    containerWidth: [String, Number],
    themeVars: Object,
    scopedDataRequest: [String, Function],
    dataRequest: Function,
  },
  setup(props, { slots }) {
    const prefixCls = `${stylePrefix}-page`
    const top = useForm()

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

    const themeVars = computed(() =>
      props.themeVars
        ? Object.keys(props.themeVars || PageConsumerProps.themeVars).reduce(
            (prev, curr) => {
              const colors = genColor(props.themeVars[curr])
              prev[curr] = colors.base
              prev[`${curr}Light`] = colors.light
              prev[`${curr}Lighter`] = colors.lighter
              prev[`${curr}Dark`] = colors.dark
              prev[`${curr}Darker`] = colors.darker
              return prev
            },
            {}
          )
        : {}
    )

    const dataRequest = props.dataRequest ?? PageConsumerProps.dataRequest
    const scopedDataRequest = props.scopedDataRequest
      ? typeof props.scopedDataRequest === 'string'
        ? (ids: Array<string | number>) =>
            dataRequest({
              url: `${props.scopedDataRequest}${
                (props.scopedDataRequest as string).indexOf('?') < 0 ? '?' : '&'
              }${ids.map((id) => `id[]=${id}`).join('&')}`,
            })
        : props.scopedDataRequest
      : PageConsumerProps.scopedDataRequest

    provide(PageInjectKey, {
      containerWidth: parseStyleUnit(
        props.containerWidth || PageConsumerProps.containerWidth
      ),
      themeVars: themeVars,
      dataRequest,
      scopedDataRequest,
    })

    const setVarsOnVNode = (vnode: VNode, vars: Record<string, string>) => {
      if (vnode?.elm) {
        setVarsOnNode(vnode.elm, vars)
      } else if (vnode?.isStatic) {
        let { elm } = vnode
        while (elm) {
          setVarsOnNode(elm, vars)
          elm = elm.nextSibling
        }
      }
    }

    const setVarsOnNode = (el: Node, vars: Record<string, string>) => {
      if (el.nodeType === 1) {
        const style = (el as HTMLElement).style
        for (const key in vars) {
          style.setProperty(`--theme-${kebabCase(key)}`, vars[key])
        }
      }
    }

    const instance = getCurrentInstance()
    const setVars = () => setVarsOnVNode(instance.vnode, themeVars.value)
    watch(themeVars, setVars)

    onMounted(() => {
      setVars()
    })

    return () => {
      const { component = 'div' } = props
      const renderContent = () => {
        return h(component, { style: prefixCls }, slots)
      }

      if (top?.value) {
        return renderContent()
      } else {
        const form = createForm()
        return h(
          FormProvider,
          { props: { form } },
          { default: () => renderContent() }
        )
      }
    }
  },
})

export default Page

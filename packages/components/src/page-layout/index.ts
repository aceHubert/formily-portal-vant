import kebabCase from 'lodash.kebabcase'
import { defineComponent, ref, watch, inject, provide } from 'vue-demi'
import { h } from '@formily/vue'
import { stylePrefix } from '../__builtins__'
import { usePropsCalcPageLayout } from './usePropsCalcPageLayout'

// Types
import type { Ref, InjectionKey } from 'vue-demi'

export interface PageLayoutProps {
  className?: string
  /**
   * css vars
   */
  themeVars?: {
    primary?: string
    [key: string]: string
  }
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
  shallow?: boolean
}

type ProvidePageLayoutProps = PageLayoutProps & {
  themeVars?: {
    primary?: string
    primaryLighter?: string
    primaryLight?: string
    primaryDarker?: string
    primaryDark?: string
    [key: string]: string
  }
  scopedDataRequest?: Extract<PageLayoutProps['scopedDataRequest'], Function>
  dataRequest?: PageLayoutProps['dataRequest']
}

export const PageLayoutDeepContext: InjectionKey<Ref<ProvidePageLayoutProps>> =
  Symbol('PageLayoutDeepContext')

export const PageLayoutShallowContext: InjectionKey<
  Ref<ProvidePageLayoutProps>
> = Symbol('PageLayoutShallowContext')

export const usePageDeepLayout = (): Ref<ProvidePageLayoutProps> =>
  inject(PageLayoutDeepContext, ref({}))

export const usePageShallowLayout = (): Ref<ProvidePageLayoutProps> =>
  inject(PageLayoutShallowContext, ref({}))

export const usePageLayout = (): Ref<ProvidePageLayoutProps> => {
  const shallowLayout = usePageShallowLayout()
  const deepLayout = usePageDeepLayout()
  const PageLayout = ref<Record<string, any>>({
    ...deepLayout.value,
    ...shallowLayout.value,
  })

  watch(
    [shallowLayout, deepLayout],
    () => {
      PageLayout.value = {
        ...deepLayout.value,
        ...shallowLayout.value,
      }
    },
    {
      deep: true,
    }
  )
  return PageLayout
}

export const PageLayout = defineComponent<PageLayoutProps>({
  name: 'PageLayout',
  props: {
    className: String,
    themeVars: Object,
    containerWidth: [String, Number],
    scopedDataRequest: [String, Function],
    dataRequest: Function,
    flex: Boolean,
    shallow: { default: true },
  },
  setup(customProps: PageLayoutProps, { attrs, slots }) {
    const prefixCls = `${stylePrefix}-page`
    const { props } = usePropsCalcPageLayout(customProps)

    const deepLayout = usePageDeepLayout()
    const newDeepLayout = ref({
      ...deepLayout,
    })
    const shallowProps = ref({})

    watch(
      [props, deepLayout],
      () => {
        shallowProps.value = props.value.shallow ? props.value : undefined
        if (!props.value.shallow) {
          Object.assign(newDeepLayout.value, props.value)
        } else {
          if (props.value.themeVars) {
            newDeepLayout.value.themeVars = props.value.themeVars
          }
        }
      },
      { deep: true, immediate: true }
    )

    provide(PageLayoutDeepContext, newDeepLayout)
    provide(PageLayoutShallowContext, shallowProps)

    // const setVarsOnVNode = (vnode: VNode, vars: Record<string, string>) => {
    //   if (vnode?.elm) {
    //     setVarsOnNode(vnode.elm, vars)
    //   } else if (vnode?.isStatic) {
    //     let { elm } = vnode
    //     while (elm) {
    //       setVarsOnNode(elm, vars)
    //       elm = elm.nextSibling
    //     }
    //   }
    // }

    // const setVarsOnNode = (el: Node, vars: Record<string, string>) => {
    //   if (el.nodeType === 1) {
    //     const style = (el as HTMLElement).style
    //     for (const key in vars) {
    //       style.setProperty(`--theme-${kebabCase(key)}`, vars[key])
    //     }
    //   }
    // }

    // const instance = getCurrentInstance()
    // const setVars = () => setVarsOnVNode(instance.vnode, themeVars.value)
    // watch(themeVars, setVars)

    // onMounted(() => {
    //   setVars()
    // })

    return () => {
      const classNames = {
        [prefixCls]: true,
        [`${prefixCls}--flex`]: props.value.flex,
        [`${prefixCls}--fullwidth`]: props.value.containerWidth === 'fullwidth',
        [`${props.value.className}`]: props.value.className !== undefined,
      }
      const style = {}
      for (const key in props.value.themeVars) {
        style[`--theme-${kebabCase(key)}`] = props.value.themeVars[key]
      }

      return h(
        'div',
        {
          class: classNames,
          style,
        },
        slots
      )
    }
  },
})

export default PageLayout

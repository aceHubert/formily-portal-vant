import kebabCase from 'lodash.kebabcase'
import { defineComponent, provide } from 'vue-demi'
import { createForm } from '@formily/core'
import { FormProvider, h, useForm } from '@formily/vue'
import { stylePrefix } from '../__builtins__/configs'
import { parseStyleUnit } from '../__builtins__/shared'
import { useCssVars } from '../__builtins__/sfc-helper'
import { PageConsumerProps } from './consumer-props'
import { PageInjectKey } from './useApi'

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
}

export const Page = defineComponent<PageProps>({
  name: 'Page',
  props: {
    component: {},
    containerWidth: [String, Number],
    themeVars: Object,
  },
  setup(props, { slots }) {
    const prefixCls = `${stylePrefix}-page`
    const top = useForm()

    useCssVars(() => {
      return props.themeVars
        ? Object.keys(props.themeVars || {}).reduce((prev, curr) => {
            prev[`theme-${kebabCase(curr)}`] = props.themeVars[curr]
            return prev
          }, {})
        : {}
    })

    provide(PageInjectKey, {
      containerWidth: parseStyleUnit(
        props.containerWidth || PageConsumerProps.containerWidth
      ),
      themeVars: props.themeVars,
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

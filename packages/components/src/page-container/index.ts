import { defineComponent } from 'vue-demi'
import { h } from '@formily/vue'
import { stylePrefix } from '../__builtins__/configs'
import { parseStyleUnit } from '../__builtins__/shared'

export interface PageContainerProps {
  /**
   * container with, default: page.containerWidth
   */
  width?: 'inherit' | string | number
}

export const PageContainer = defineComponent<PageContainerProps>({
  name: 'PageContainer',
  props: {
    width: [String, Number],
  },
  setup(props, { slots }) {
    const prefixCls = `${stylePrefix}-page-container`

    return () => {
      const clasNames: Record<string, boolean> = {
        [prefixCls]: true,
      }
      const style: Record<string, any> = {}
      if (props.width && props.width !== 'inherit') {
        style.width = parseStyleUnit(props.width)
        style.maxWidth = '100%'
      }

      return h(
        'div',
        {
          class: clasNames,
          style,
        },
        { default: () => [slots.default?.()] }
      )
    }
  },
})

export default PageContainer

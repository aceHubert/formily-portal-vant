import { defineComponent, h } from 'vue-demi'
import { stylePrefix } from '../__builtins__/configs'
import { parseStyleUnit } from '../__builtins__/shared'
import { usePage } from '../page/useApi'

export interface PageContainerProps {
  /**
   * container with, default: page.containerWidth
   */
  width?: 'fullwidth' | string | number
}

export const PageContainer = defineComponent<PageContainerProps>({
  name: 'PageContainer',
  props: {
    width: { type: [String, Number] },
  },
  setup(props, { slots }) {
    const prefixCls = `${stylePrefix}-page-container`

    return () => {
      const { width } = props
      const style: Record<string, any> = {}
      if (width) {
        width !== 'fullwidth' && (style.width = parseStyleUnit(width))
      } else {
        const { containerWidth } = usePage()
        style.width = containerWidth
      }

      return h(
        'div',
        {
          class: [prefixCls, width === 'fullwidth' && `${prefixCls}-fullwidth`],
          style,
        },
        slots.default?.()
      )
    }
  },
})

export default PageContainer

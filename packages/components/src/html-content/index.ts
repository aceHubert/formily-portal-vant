import { defineComponent } from 'vue-demi'
import { h } from '@formily/vue'
import { stylePrefix } from '../__builtins__/configs'

export interface HtmlProps {
  /**
   * innerHTML content
   */
  content?: string
}

export const HtmlContent = defineComponent<HtmlProps>({
  name: 'Html',
  props: {
    content: String,
  },
  setup(props, { slots }) {
    const prefixCls = `${stylePrefix}-html`

    return () => {
      const content =
        props.content ||
        (() => {
          // child is a string
          const def = slots.default?.()
          if (typeof def === 'string') {
            return def
          }
          return ''
        })()

      return h(
        'div',
        {
          class: [prefixCls],
          domProps: {
            innerHTML: content,
          },
        },
        {}
      )
    }
  },
})

export default HtmlContent

import { defineComponent, h } from 'vue-demi'
import { stylePrefix } from '../__builtins__/configs'
import { resolveComponent } from '../__builtins__/shared'

export interface EntryItemProps {
  /**
   * icon, png|jpg 以img标签渲染
   * @type any (string | slot | VNode)
   */
  icon: any
  /**
   * text
   * @type any (string | slot | VNode)
   */
  text: any
  /**
   * 打开链接
   */
  linkUrl?: string
  /**
   * 链接打开方式
   */
  blank?: boolean
}

export type onClick = (item: EntryItemProps) => void

export const EntryItem = defineComponent<EntryItemProps>({
  name: 'EntryItem',
  inheritAttrs: false,
  emits: ['click'],
  props: {
    icon: {},
    text: {},
    linkUrl: String,
    blank: Boolean,
  },
  setup(props, { attrs, emit }) {
    const prefixCls = `${stylePrefix}-entry-item`

    return () => {
      const { icon, text, blank, linkUrl } = props
      const renderIcon = () => {
        return h(
          'div',
          {
            class: `${prefixCls}__icon`,
          },
          [
            typeof icon === 'string' &&
            /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png)/g.test(icon)
              ? h('img', {
                  domProps: {
                    src: icon,
                    alt: typeof text === 'string' ? text : icon,
                  },
                })
              : resolveComponent(icon),
          ]
        )
      }

      const renderText = () => {
        return h(
          'p',
          {
            class: `${prefixCls}__text`,
          },
          [resolveComponent(text)]
        )
      }

      return h(
        'a',
        {
          class: prefixCls,
          domProps: {
            href: linkUrl || 'javascript:;',
            target: blank ? '_blank' : '_self',
          },
          on: {
            click: () => {
              ;(attrs.onClick as onClick)?.({ ...props })
              emit('click', { ...props })
            },
          },
        },
        [renderIcon(), renderText()]
      )
    }
  },
})

export default EntryItem

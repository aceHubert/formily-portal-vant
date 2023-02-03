import { defineComponent } from 'vue-demi'
import { Icon } from 'vant'
import { h } from '@formily/vue'
import { stylePrefix } from '../__builtins__/configs'
import { resolveComponent, parseStyleUnit } from '../__builtins__/shared'

export interface EntryItemProps {
  /**
   * icon, png|jpg 以img标签渲染(http(s)) 开头，否则以iconfont渲染
   * @type any (string | slot | VNode)
   */
  icon: any
  /**
   * icon class prefix, 如果 icon 是 iconfont
   */
  iconPrefix: string
  /**
   * icon font-size
   */
  iconFontSize: number | string
  /**
   * icon img height/width
   */
  iconImgSize: number | string
  /**
   * icon box element style
   */
  iconStyle: string
  /**
   * text
   * @type any (string | slot | VNode)
   */
  text: any
  /**
   * text box element style
   */
  textStyle: string
  /**
   * 打开链接
   */
  linkUrl?: string
  /**
   * 链接打开方式
   */
  linkTarget?: '_self' | '_blank'
}

export type onClick = (item: EntryItemProps) => void

export const EntryItem = defineComponent<EntryItemProps>({
  name: 'EntryItem',
  inheritAttrs: false,
  emits: ['click'],
  props: {
    icon: {},
    iconPrefix: String,
    iconStyle: String,
    iconFontSize: [String, Number],
    iconImgSize: [String, Number],
    text: {},
    textStyle: String,
    linkUrl: String,
    linkTarget: String,
  },
  setup(props, { attrs, emit }) {
    const prefixCls = `${stylePrefix}-entry-item`

    return () => {
      const {
        icon,
        iconPrefix = 'icon',
        iconFontSize,
        iconImgSize,
        iconStyle,
        text,
        textStyle,
        linkUrl,
        linkTarget,
      } = props

      const renderIcon = h(
        'div',
        {
          class: `${prefixCls}__icon`,
          style: iconStyle,
        },
        {
          default: () => [
            typeof icon === 'string'
              ? /(http(s?):)?\/\/([/|.|?|=|\w|\s|-])*/gi.test(icon)
                ? h(
                    'img',
                    {
                      style:
                        iconImgSize && iconImgSize !== 'inherit'
                          ? {
                              height: parseStyleUnit(iconImgSize),
                              width: parseStyleUnit(iconImgSize),
                            }
                          : {},
                      domProps: {
                        src: icon,
                        alt: typeof text === 'string' ? text : icon,
                      },
                    },
                    {}
                  )
                : h(
                    Icon,
                    {
                      style:
                        iconFontSize && iconFontSize !== 'inherit'
                          ? `font-size: ${parseStyleUnit(iconFontSize)}`
                          : '',
                      props: {
                        name: icon,
                        classPrefix: iconPrefix,
                      },
                    },
                    {}
                  )
              : resolveComponent(icon),
          ],
        }
      )

      const renderText = h(
        'p',
        {
          class: `${prefixCls}__text`,
          style: textStyle,
        },
        { default: () => [resolveComponent(text)] }
      )

      return h(
        'a',
        {
          class: prefixCls,
          domProps: {
            href: linkUrl || 'javascript:;',
            target: linkTarget || '_self',
          },
          on: {
            click: () => {
              ;(attrs.onClick as onClick)?.({ ...props })
              emit('click', { ...props })
            },
          },
        },
        { default: () => [renderIcon, renderText] }
      )
    }
  },
})

export default EntryItem

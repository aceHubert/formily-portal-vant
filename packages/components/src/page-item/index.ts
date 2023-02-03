import { defineComponent } from 'vue-demi'
import { useField, h } from '@formily/vue'
import { stylePrefix } from '../__builtins__/configs'
import { resolveComponent } from '../__builtins__/shared'

export interface PageItemProps {
  /**
   * 标题, 默认值：field.title
   * @type any (string | slot | VNode)
   */
  title?: any
  /**
   * 标题下划线样式
   */
  titleUnderline?: boolean
  /**
   * 标题右侧内容或组件
   * @type any (string | slot | VNode)
   */
  titleRight?: any
  /**
   * 标题右侧内容以链接显示
   */
  titleRightLink?: string
  /**
   * 链接打开方式
   */
  titleRightLinkTarget?: '_blank' | '_self'
}

export const PageItem = defineComponent<PageItemProps>({
  name: 'PageItem',
  props: {
    title: {},
    titleUnderline: Boolean,
    titleRight: {},
    titleRightLink: String,
    titleRightLinkTarget: String,
  },
  setup(props, { slots }) {
    const fieldRef = useField()
    const prefixCls = `${stylePrefix}-page-item`

    return () => {
      const { title = fieldRef.value.title, titleUnderline, titleRight } = props

      const renderTitle =
        (slots.title || title) &&
        h(
          'div',
          {
            class: [
              `${prefixCls}__title`,
              {
                [`${prefixCls}__title--underline`]: !!titleUnderline,
              },
            ],
          },
          {
            default: () => [
              h(
                'p',
                {
                  class: `${prefixCls}-title__text`,
                },
                {
                  default: () => [slots.title?.() || resolveComponent(title)],
                }
              ),
              (slots.titleRight || titleRight) &&
                h(
                  'div',
                  {
                    class: `${prefixCls}-title__right`,
                  },
                  {
                    default: () => [
                      props.titleRightLink
                        ? h(
                            'a',
                            {
                              domProps: {
                                href: props.titleRightLink,
                                target: props.titleRightLinkTarget,
                              },
                            },
                            {
                              default: () => [
                                slots.titleRight?.() ||
                                  resolveComponent(titleRight),
                              ],
                            }
                          )
                        : slots.titleRight?.() || resolveComponent(titleRight),
                    ],
                  }
                ),
            ],
          }
        )

      const renderContent = h(
        'div',
        {
          class: `${prefixCls}__content`,
        },
        { default: () => [slots.default?.()] }
      )
      return h(
        'div',
        {
          class: [prefixCls],
        },
        { default: () => [renderTitle, renderContent] }
      )
    }
  },
})

export default PageItem

import { defineComponent, h } from 'vue-demi'
import { useField } from '@formily/vue'
import { observer } from '@formily/reactive-vue'
import { Swipe, SwipeItem } from 'vant'
import { stylePrefix } from '../__builtins__/configs'
import { parseStyleUnit, createDataResource } from '../__builtins__/shared'
import { usePage } from '../page/useApi'

// Types
import type { VNode } from 'vue-demi'
import type { Field } from '@formily/core'
import type { ScopedDataSource, RemoteDataSource } from '../__builtins__/shared'

export interface BannerItem {
  key: string | number
  imageUrl: string
  linkUrl?: string
  linkTarget?: '_self' | '_blank'
}

export interface BannerProps {
  /**
   * 默认显示的dataSource中key的下标，默认：0
   */
  defaultKey?: BannerItem['key']
  /**
   * 数据源
   */
  dataSource: ScopedDataSource<BannerItem> | RemoteDataSource<BannerItem>
  /**
   * 显示的高度(当不设置高度时以 img 标签渲染出图片实际调试，否则按背景平铺)
   */
  height?: string | number
  /**
   * 自动轮播间隔，单位为 ms
   */
  autoplay?: number | string
  /**
   * 自定义item class
   */
  itemClassName?: string
}

type onChange = (key: string | number) => void
type onItemClick = (item: BannerItem) => void

export const Banner = observer(
  defineComponent<BannerProps>({
    name: 'Banner',
    inheritAttrs: false,
    emit: ['change', 'itemClick'],
    props: {
      defaultKey: [String, Number],
      dataSource: [Array, Object],
      height: [String, Number],
      autoplay: [String, Number],
      itemClassName: String,
    },
    setup(props, { attrs, emit }) {
      const fieldRef = useField<Field>()
      const { scopedDataRequest, dataRequest } = usePage()
      const prefixCls = `${stylePrefix}-banner`

      const datas = createDataResource(props.dataSource || [], {
        scopedDataRequest,
        dataRequest,
      })

      datas.read()

      return () => {
        const { $result = [], $loading, $error } = datas

        if ($loading) return null

        if ($error)
          return h('div', { class: `${prefixCls}__error` }, $error.message)

        let initialSwipe = 0
        if (
          props.defaultKey &&
          (initialSwipe = $result.findIndex(
            ({ key }) => key === props.defaultKey
          )) < 0
        ) {
          initialSwipe = 0
        }

        const { autoplay = 3000, height } = props

        const renderItems = (): VNode[] => {
          if (height) {
            return $result.map((item) =>
              h(SwipeItem, [
                h('a', {
                  class: [`${prefixCls}__item`, props.itemClassName],
                  style: {
                    backgroundImage: `url(${item.imageUrl})`,
                    height: parseStyleUnit(height),
                  },
                  domProps: {
                    target: item.linkTarget || '_self',
                    href: item.linkUrl || 'javascript:;',
                  },
                  on: {
                    click: () => {
                      ;(attrs.onItemClick as onItemClick)?.(item)
                      emit('itemClick', item)
                    },
                  },
                }),
              ])
            )
          } else {
            return $result.map((item) =>
              h(SwipeItem, [
                h(
                  'a',
                  {
                    class: [`${prefixCls}__item`, props.itemClassName],
                    domProps: {
                      target: item.linkTarget || '_self',
                      href: item.linkUrl || 'javascript:;',
                    },
                    on: {
                      click: () => {
                        ;(attrs.onItemClick as onItemClick)?.(item)
                        emit('itemClick', item)
                      },
                    },
                  },
                  [
                    h('img', {
                      domProps: {
                        src: item.imageUrl,
                        alt: item.imageUrl,
                      },
                    }),
                  ]
                ),
              ])
            )
          }
        }

        return h(
          Swipe,
          {
            class: prefixCls,
            props: {
              ...attrs,
              initialSwipe,
              autoplay,
            },
            on: {
              change: (index) => {
                const value = $result[index].key
                ;(attrs.onChange as onChange)?.(value)
                emit('change', value)
                fieldRef.value.setValue?.(value)
              },
            },
          },
          renderItems()
        )
      }
    },
  })
)

export default Banner

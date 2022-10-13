import { defineComponent, h, ref, watch } from 'vue-demi'
import { Swipe, SwipeItem } from 'vant'
import { stylePrefix } from '../__builtins__/configs'
import { parseStyleUnit } from '../__builtins__/shared'

// Types
import type { VNode } from 'vue-demi'
import type { RemoteDataSource } from '../__builtins__/shared'

export interface BannerItem {
  key: string | number
  imageUrl: string
  linkUrl?: string
}

export interface RemoteBannerDataSource extends RemoteDataSource {}

export interface BannerProps {
  /**
   * 默认显示的dataSource中key的下标，默认：0
   */
  defaultKey?: BannerItem['key']
  /**
   * 数据源
   * TODO: remote dataSource and dataMapper
   */
  dataSource: BannerItem[] | RemoteBannerDataSource
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
  itemClass: string
}

type onItemClick = (item: BannerItem) => void

export const Banner = defineComponent<BannerProps>({
  name: 'Banner',
  inheritAttrs: false,
  emit: ['change'],
  props: {
    defaultKey: [String, Number],
    dataSource: { type: [Array, Object], required: true },
    height: [String, Number],
    autoplay: {
      type: [String, Number],
      default: 3000,
    },
  },
  setup(props, { attrs, emit }) {
    const prefixCls = `${stylePrefix}-banner`
    const itemsRef = ref<BannerItem[]>([])

    watch(
      () => props.dataSource,
      (value) => {
        if (Array.isArray(value)) {
          itemsRef.value = value
        } else {
          // TODO: request from remote
        }
      },
      { immediate: true }
    )

    let initialSwipe = 0
    if (
      props.defaultKey &&
      (initialSwipe = itemsRef.value.findIndex(
        ({ key }) => key === props.defaultKey
      )) < 0
    ) {
      initialSwipe = 0
    }

    return () => {
      const items = itemsRef.value
      const { autoplay = 3000, height } = props

      const renderItems = (): VNode[] => {
        if (height) {
          return itemsRef.value.map((item) =>
            h(SwipeItem, [
              h('a', {
                class: `${prefixCls}__item`,
                style: {
                  backgroundImage: `url(${item.imageUrl})`,
                  height: parseStyleUnit(height),
                },
                domProps: {
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
          return itemsRef.value.map((item) =>
            h(SwipeItem, [
              h(
                'a',
                {
                  class: [`${prefixCls}__item`, props.itemClass],
                  domProps: {
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
              emit('change', items[index].key)
            },
          },
        },
        renderItems()
      )
    }
  },
})

export default Banner

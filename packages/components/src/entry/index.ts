import { defineComponent, h, ref, watch } from 'vue-demi'
import { Swipe } from 'vant'
import { stylePrefix } from '../__builtins__/configs'
import { composeExport } from '../__builtins__/shared'
import { EntryItem } from './item'

// Types
import type { VNode } from 'vue-demi'
import type { RemoteDataSource } from '../__builtins__/shared'
import type { EntryItemProps, onClick } from './item'

export interface RemoteEntryDataSource extends RemoteDataSource {}

export interface EntryProps {
  /**
   * 数据源
   * TODO: remote dataSource and dataMapper
   */
  dataSource: EntryItemProps[] | RemoteEntryDataSource
  /**
   * 显示的列数
   */
  columns: number
  /**
   * 显示的行数
   */
  rows?: number
}

const EntryContainer = defineComponent<EntryProps>({
  name: 'Entry',
  inheritAttrs: false,
  props: {
    dataSource: { type: [Array, Object], required: true },
    columns: { type: Number, default: 6 },
    rows: Number,
  },
  setup(props, { attrs, emit }) {
    const prefixCls = `${stylePrefix}-entry`
    const itemsRef = ref<EntryItemProps[]>([])

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

    return () => {
      const { rows, columns } = props
      const items = itemsRef.value

      const renderItems = (items: EntryItemProps[]): VNode => {
        const cols = items.length < columns ? items.length : columns
        const rows = items.length / cols + (items.length % cols === 0 ? 0 : 1)

        return h(
          'div',
          {
            class: [prefixCls, { [`${prefixCls}--mulit-lines`]: rows > 1 }],
          },
          items.map((item) =>
            h(EntryItem, {
              style: {
                flexBasis: `${100 / cols}%`,
              },
              props: {
                icon: item.icon,
                text: item.text,
                linkUrl: item.linkUrl,
                blank: item.blank,
              },
              on: {
                click: () => {
                  const plain = JSON.parse(JSON.stringify(item))
                  ;(attrs.onItemClick as onClick)?.(plain)
                  emit('itemClick', plain)
                },
              },
            })
          )
        )
      }

      const renderPagedItems = () => {
        const length = rows! * columns
        let index = 0
        const itemVNodes: VNode[] = []
        while (index < items.length - 1) {
          const children = []
          for (let i = index; i < index + length; i++) {
            children.push(items[i])
          }
          itemVNodes.push(
            h(
              'div',
              {
                class: `${prefixCls}__paged-item`,
              },
              [renderItems(children.filter(Boolean))]
            )
          )
          index += length
        }

        return itemVNodes
      }

      if (rows && rows * columns < items.length) {
        return h(
          Swipe,
          [renderPagedItems()]
        )
      } else {
        return renderItems(items)
      }
    }
  },
})

export const Entry = composeExport(EntryContainer, {
  Item: EntryItem,
})

export default Entry

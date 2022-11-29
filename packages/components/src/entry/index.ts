import { defineComponent, h } from 'vue-demi'
import { observer } from '@formily/reactive-vue'
import { useField } from '@formily/vue'
import { Swipe } from 'vant'
import { stylePrefix } from '../__builtins__/configs'
import { composeExport, createDataResource } from '../__builtins__/shared'
import { usePage } from '../page/useApi'
import { EntryItem } from './item'
// Types
import type { VNode } from 'vue-demi'
import type { Field } from '@formily/core'
import type { ScopedDataSource, RemoteDataSource } from '../__builtins__/shared'
import type { EntryItemProps, onClick } from './item'

export interface EntryProps {
  /**
   * 数据源
   */
  dataSource:
    | ScopedDataSource<EntryItemProps>
    | RemoteDataSource<EntryItemProps>
  /**
   * 显示的列数，默认：4
   */
  columns: number
  /**
   * 显示的行数(当限制行数时横向滚动)
   */
  rows?: number
  /**
   * item props 默认值，item 里的设置优先
   */
  itemProps: Record<string, any>
}

const EntryContainer = observer(
  defineComponent<EntryProps>({
    name: 'Entry',
    inheritAttrs: false,
    props: {
      dataSource: [Array, Object],
      columns: Number,
      rows: Number,
      itemProps: Object,
    },
    setup(props, { attrs, emit }) {
      const fieldRef = useField<Field>()
      const { scopedDataRequest, dataRequest } = usePage()
      const prefixCls = `${stylePrefix}-entry`

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

        const { rows, columns = 4 } = props

        const renderItems = (items: EntryItemProps[]): VNode => {
          const cols = items.length < columns ? items.length : columns
          const rows = items.length / cols + (items.length % cols === 0 ? 0 : 1)

          return h(
            'div',
            {
              class: [prefixCls, { [`${prefixCls}--mulit-lines`]: rows > 1 }],
            },
            items.map((itemProps) =>
              h(EntryItem, {
                style: {
                  flexBasis: `${100 / cols}%`,
                },
                props: Object.assign({}, props.itemProps, itemProps),
                on: {
                  click: () => {
                    const plain = JSON.parse(JSON.stringify(itemProps))
                    ;(attrs.onItemClick as onClick)?.(plain)
                    emit('itemClick', plain)
                    fieldRef.value.setValue?.(plain)
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
          while (index < $result.length - 1) {
            const children = []
            for (let i = index; i < index + length; i++) {
              children.push($result[i])
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

        if (rows && rows * columns < $result.length) {
          return h(Swipe, [renderPagedItems()])
        } else {
          return renderItems($result)
        }
      }
    },
  })
)

export const Entry = composeExport(EntryContainer, {
  Item: EntryItem,
})

export default Entry

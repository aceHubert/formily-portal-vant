import { defineComponent, h, watch } from 'vue-demi'
import { observer } from '@formily/reactive-vue'
import { useField } from '@formily/vue'
import { stylePrefix } from '../__builtins__/configs'
import {
  composeExport,
  createDataResource,
  equals,
} from '../__builtins__/shared'
import { usePage } from '../page/useApi'
import { EntryItem } from './item'

// Types
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
   * 当使用 rows 时 item 的自定义高度用于滑动隐藏滚动条，单位：rem
   */
  itemHeight?: number
  /**
   * 当使用 rows 时 item 的自定义宽度，单位：rem
   */
  itemWidth?: number
  /**
   * item props 默认值，item 里的设置优先
   */
  itemProps?: Record<string, any>
}

const EntryContainer = observer(
  defineComponent<EntryProps>({
    name: 'Entry',
    inheritAttrs: false,
    props: {
      dataSource: [Array, Object],
      columns: Number,
      rows: Number,
      itemHeight: Number,
      itemWidth: Number,
      itemProps: Object,
    },
    setup(props, { attrs, emit }) {
      const fieldRef = useField<Field>()
      const { scopedDataRequest, dataRequest } = usePage()
      const prefixCls = `${stylePrefix}-entry`

      const datas = createDataResource<EntryItemProps>({
        scopedDataRequest,
        dataRequest,
      })

      watch(
        () => props.dataSource,
        (value, old) => {
          !equals(value, old) &&
            datas.read({
              dataSource: value || [],
            })
        },
        { immediate: true, deep: true }
      )

      return () => {
        const { $result = [], $loading, $error } = datas

        if ($loading) return null

        if ($error)
          return h('div', { class: `${prefixCls}__error` }, $error.message)

        if (props.rows && props.rows > 1) {
          const { rows, itemHeight = 2.351, itemWidth = 2 } = props
          const _cols =
            $result.length / rows + ($result.length % rows === 0 ? 0 : 1)
          return h(
            'div',
            {
              class: [prefixCls, `${prefixCls}--scrollable`],
              style: { height: `${rows * itemHeight}rem` },
            },
            [
              h(
                'div',
                {
                  class: `${prefixCls}__row-wrap`,
                },
                Array.from({ length: _cols }).map((_, index) =>
                  h(
                    'div',
                    {
                      class: [
                        `${prefixCls}__cols`,
                        `${prefixCls}__cols--${index}`,
                      ],
                    },
                    $result
                      .slice(index * rows, (index + 1) * rows)
                      .map((itemProps) =>
                        h(EntryItem, {
                          style: {
                            width: `${itemWidth}rem`,
                            flexBasis: `${100 / rows}%`,
                          },
                          props: Object.assign({}, props.itemProps, itemProps),
                          on: {
                            click: () => {
                              const plain = JSON.parse(
                                JSON.stringify(itemProps)
                              )
                              ;(attrs.onItemClick as onClick)?.(plain)
                              emit('itemClick', plain)
                              fieldRef.value.setValue?.(plain)
                            },
                          },
                        })
                      )
                  )
                )
              ),
            ]
          )
        } else {
          const { columns = 4 } = props
          const cols = $result.length < columns ? $result.length : columns
          const rows =
            $result.length / cols + ($result.length % cols === 0 ? 0 : 1)
          return h(
            'div',
            {
              class: [
                prefixCls,
                {
                  [`${prefixCls}--mulit-lines`]: rows > 1, // 大于1行时左对齐，否则平铺
                },
              ],
            },
            $result.map((itemProps) =>
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
      }
    },
  })
)

export const Entry = composeExport(EntryContainer, {
  Item: EntryItem,
})

export default Entry

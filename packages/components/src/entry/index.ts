import { defineComponent, watch } from 'vue-demi'
import { observer } from '@formily/reactive-vue'
import { useField, h } from '@formily/vue'
import { stylePrefix } from '../__builtins__/configs'
import {
  composeExport,
  createDataResource,
  parseStyleUnit,
  equals,
} from '../__builtins__'
import { usePageLayout } from '../page-layout'
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
   * 当使用 rows 时 columns 之间间隔
   */
  gutter?: string | number
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
      gutter: [String, Number],
      itemProps: Object,
    },
    setup(props, { attrs, emit }) {
      const fieldRef = useField<Field>()
      const pageLayoutRef = usePageLayout()
      const prefixCls = `${stylePrefix}-entry`

      const datas = createDataResource<EntryItemProps>({
        scopedDataRequest: pageLayoutRef.value.scopedDataRequest,
        dataRequest: pageLayoutRef.value.dataRequest,
      })

      watch(
        () => props.dataSource,
        (value, old) => {
          ;(!datas.$loaded || !equals(value, old)) &&
            datas.read(value || (fieldRef.value.dataSource as any))
        },
        { immediate: true, deep: true }
      )

      return () => {
        const { $result = [], $loading, $error } = datas

        if ($loading) return null

        if ($error)
          return h(
            'div',
            { class: `${prefixCls}__error` },
            { default: () => [$error.message] }
          )

        if (props.rows && props.rows >= 1) {
          const { rows, gutter } = props
          const _cols =
            $result.length / rows + ($result.length % rows === 0 ? 0 : 1)
          const _gutter = gutter && gutter !== 'inherit' ? gutter : 0.834
          const _gutterWidth = parseStyleUnit(
            parseFloat(String(_gutter)) / 2,
            typeof _gutter === 'string' ? _gutter.replace(/\d+/, '') : 'rem'
          )

          return h(
            'div',
            {
              class: [`${prefixCls}-wrap`, `${prefixCls}-wrap--scrollable`],
            },
            {
              default: () => [
                h(
                  'div',
                  {
                    class: [prefixCls],
                  },
                  {
                    default: () =>
                      Array.from({ length: _cols }).map((_, index) =>
                        h(
                          'div',
                          {
                            class: [
                              `${prefixCls}__item`,
                              `${prefixCls}__item--${index}`,
                            ],
                            style: {
                              paddingLeft: _gutterWidth,
                              paddingRight: _gutterWidth,
                            },
                          },
                          {
                            default: () =>
                              $result
                                .slice(index * rows, (index + 1) * rows)
                                .map((itemProps) =>
                                  h(
                                    EntryItem,
                                    {
                                      style: {
                                        flexBasis: `${100 / rows}%`,
                                      },
                                      props: Object.assign(
                                        {},
                                        props.itemProps,
                                        itemProps
                                      ),
                                      on: {
                                        click: () => {
                                          const plain = JSON.parse(
                                            JSON.stringify(itemProps)
                                          )
                                          ;(attrs.onItemClick as onClick)?.(
                                            plain
                                          )
                                          emit('itemClick', plain)
                                          fieldRef.value.setValue?.(plain)
                                        },
                                      },
                                    },
                                    {}
                                  )
                                ),
                          }
                        )
                      ),
                  }
                ),
              ],
            }
          )
        } else {
          const { columns = 4 } = props
          const cols = $result.length < columns ? $result.length : columns
          const rows =
            $result.length / cols + ($result.length % cols === 0 ? 0 : 1)
          return h(
            'div',
            {
              class: [`${prefixCls}-wrap`],
            },
            {
              default: () => [
                h(
                  'div',
                  {
                    class: [
                      prefixCls,
                      `${prefixCls}--rows-${rows}`, // 大于1行时左对齐，否则平铺
                    ],
                  },
                  {
                    default: () =>
                      $result.map((itemProps) =>
                        h(
                          EntryItem,
                          {
                            style: {
                              flexBasis: `${100 / cols}%`,
                            },
                            props: Object.assign(
                              {},
                              props.itemProps,
                              itemProps
                            ),
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
                          },
                          {}
                        )
                      ),
                  }
                ),
              ],
            }
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

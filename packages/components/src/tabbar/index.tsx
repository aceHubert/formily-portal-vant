import { defineComponent, getCurrentInstance, h, watch } from 'vue-demi'
import { observer } from '@formily/reactive-vue'
import { useField } from '@formily/vue'
import { Tabbar as VTabbar, TabbarItem as VTabbarItem, Icon } from 'vant'
import { stylePrefix } from '../__builtins__/configs'
import {
  isAbsoluteUrl,
  createDataResource,
  equals,
} from '../__builtins__/shared'
import { usePage } from '../page/useApi'

// Types
import type { Field } from '@formily/core'
import type { ScopedDataSource, RemoteDataSource } from '../__builtins__/shared'

export interface TabbarItem {
  key?: string | number
  icon:
    | string
    | {
        active: string
        inactive: string
      }
  iconClassPrefix?: string
  text: string
  linkUrl?: string
  replace?: boolean
  dot?: boolean
  badge?: number | string
}

export interface TabbarProps {
  /**
   * 数据源
   */
  dataSource: ScopedDataSource<TabbarItem> | RemoteDataSource<TabbarItem>
  /**
   * item key or index
   */
  value: string | number
  /**
   * icon class-prefix, TabbarItem 的定义优先, 默认: icon
   */
  iconClassPrefix?: string
}

type onChange = (key: string | number) => void

export const Tabbar = observer(
  defineComponent<TabbarProps>({
    name: 'Tabbar',
    inheritAttrs: false,
    emits: ['change'],
    props: {
      dataSource: [Array, Object],
      value: [String, Number],
      iconClassPrefix: String,
    },
    setup(props, { attrs, emit }) {
      const instance = getCurrentInstance()
      const fieldRef = useField<Field>()
      const { scopedDataRequest, dataRequest } = usePage()
      const prefixCls = `${stylePrefix}-tabbar`

      const datas = createDataResource<TabbarItem>({
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

      const isUrlInCurrentRouterInstance = (url: string) => {
        if (!url || isAbsoluteUrl(url)) {
          return false
        } else if ((instance.proxy as any).$router) {
          const { resolved } = (instance.proxy as any).$router.resolve(url)
          return !!resolved.matched.length
        } else {
          return false
        }
      }

      const renderItems = (items: TabbarItem[] = []) => {
        return items.map((item) => {
          const icon =
            typeof item.icon === 'string'
              ? {
                  active: item.icon,
                  inactive: item.icon,
                }
              : item.icon
          const urlInRouter = isUrlInCurrentRouterInstance(item.linkUrl)

          return h(
            VTabbarItem,
            {
              class: `${prefixCls}-item`,
              props: {
                name: item.key,
                to: urlInRouter ? item.linkUrl : void 0,
                url: urlInRouter ? void 0 : item.linkUrl,
                replace: item.replace,
                dot: item.dot,
                badge: item.badge,
              },
              scopedSlots: {
                icon: (active) =>
                  h(Icon, {
                    class: `${prefixCls}-item__icon`,
                    props: {
                      name: active ? icon.active : icon.inactive,
                      classPrefix:
                        props.iconClassPrefix ?? item.iconClassPrefix ?? 'icon',
                    },
                  }),
              },
            },
            [h('span', { class: `${prefixCls}-item__text` }, item.text)]
          )
        })
      }

      return () => {
        const { $result = [], $loading, $error } = datas

        if ($loading) return null

        if ($error)
          return h('div', { class: `${prefixCls}__error` }, $error.message)

        // attrs 中非on开头的参数传给tabbar props
        const tabbarProps = Object.keys(attrs).reduce(
          (props, key) => {
            if (!key.startsWith('on')) {
              props[key] = attrs[key]
            }
            return props
          },
          {
            value: props.value,
          }
        )

        return h(
          VTabbar,
          {
            class: [prefixCls],
            props: tabbarProps,
            on: {
              change: (current) => {
                const key =
                  typeof current === 'number' && current < $result.length
                    ? $result[current].key
                    : current
                ;(attrs.onChange as onChange)?.(key)
                emit('change', key)
                fieldRef.value.setValue(key)
              },
            },
          },
          renderItems($result)
        )
      }
    },
  })
)

export default Tabbar

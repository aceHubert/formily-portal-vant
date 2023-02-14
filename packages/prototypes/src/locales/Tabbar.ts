export const Tabbar = {
  'zh-CN': {
    title: '标签栏',
    settings: {
      'x-component-props': {
        dataSource: {
          title: '数据源',
          dataSource: [],
        },
        fixed: '是否固定在底部',
        border: '是否显示外边框',
        'active-color': '选中标签的颜色',
        'inactive-color': '未选中标签的颜色',
        placeholder: {
          title: '占位元素',
          tooltip: '固定在底部时，是否在标签位置生成一个等高的占位元素',
        },
        'safe-area-inset-bottom': {
          title: '底部安全区适配',
          tooltip: '是否开启底部安全区适配，设置 fixed 时默认开启',
        },
      },
    },
  },
  'en-US': {
    title: 'Tabbar',
    settings: {
      'x-component-props': {
        dataSource: {
          title: 'DataSource',
          dataSource: [],
        },
        fixed: 'Fixed bottom',
        border: 'Show border',
        'active-color': 'Active color',
        'inactive-color': 'Inactive color',
        placeholder: {
          title: 'Placeholder',
          tooltip: 'Whether to generate a placeholder element when fixed',
        },
        'safe-area-inset-bottom': {
          title: 'Safe area',
          tooltip: 'Whether to enable bottom safe area adaptation',
        },
      },
    },
  },
}

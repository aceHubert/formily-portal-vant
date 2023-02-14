export const Banner = {
  'zh-CN': {
    title: '横幅',
    settings: {
      'x-component-props': {
        dataSource: {
          title: '数据源',
          dataSource: [],
        },
        defaultKey: {
          title: '默认选中项',
          tooltip: '数据源中的 key 值',
        },
        autoplay: {
          title: '自动播放',
          tooltip: '自动播放间隔时间（毫秒），默认是 3000 毫秒',
        },
        'show-indicators': '显示指示器',
        height: {
          title: '高度',
          tooltip: '如果设置 auto 则自适应图片高度',
        },
      },
    },
  },
  'en-US': {
    title: 'Banner',
    settings: {
      'x-component-props': {
        dataSource: {
          title: 'DataSource',
          dataSource: [],
        },
        defaultKey: {
          title: 'Default selected key',
          tooltip: 'key from DataSource',
        },
        autoplay: {
          title: 'Autoplay',
          tooltip: 'Autoplay interval (ms), default is 3000ms',
        },
        'show-indicators': 'show indicators',
        height: {
          title: 'Height',
          tooltip: "Fit from image's height if set auto",
        },
      },
    },
  },
}

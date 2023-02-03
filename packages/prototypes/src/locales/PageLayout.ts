import { createLocales } from '@designable/core'
import { Component } from './Component'

export const PageLayout = createLocales(Component, {
  'zh-CN': {
    title: '页面',
    settings: {
      'x-component-props': {
        themeVars: {
          primary: '主题色',
        },
        shallow: '是否浅传递',
      },
    },
  },
  'en-US': {
    title: 'Page',
    settings: {
      'x-component-props': {
        themeVars: {
          primary: 'Primary color',
        },
        shallow: 'Shallow',
      },
    },
  },
})

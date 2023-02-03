import { createLocales } from '@designable/core'
import { Component } from './Component'

export const Page = createLocales(Component, {
  'zh-CN': {
    title: '页面',
    settings: {
       themeVars: {
        primary: '主题色',
      },
      shallow: '是否浅传递',
    },
  },
  'en-US': {
    title: 'Page',
    settings: {    
      themeVars: {
        primary: 'Primary color',
      },
      shallow: 'Shallow',
    },
  },
})

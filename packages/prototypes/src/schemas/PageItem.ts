import type { ISchema } from '@formily/vue'

export const PageItem: ISchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {},
    },
    titleUnderline: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {},
    },
    titleRight: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {},
    },
    titleRightLink: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {},
    },
    titleRightLinkTarget: {
      type: 'string',
      enum: ['_self', '_blank'],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        allowClear: true,
      },
    },
  },
}

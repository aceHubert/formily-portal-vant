import type { ISchema } from '@formily/vue'

export const Tabbar: ISchema = {
  type: 'object',
  properties: {
    // dataSource: {
    //   type: 'string',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Input',
    //   'x-component-props': {
    //     allowClear: true,
    //   },
    // },
    fixed: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
    border: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        defaultChecked: true,
      },
    },
    'active-color': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'ColorInput',
    },
    'inactive-color': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'ColorInput',
    },
    placeholder: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    'safe-area-inset-bottom': {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}

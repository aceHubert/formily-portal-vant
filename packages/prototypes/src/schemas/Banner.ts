import type { ISchema } from '@formily/vue'

export const Banner: ISchema = {
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
    defaultKey: {
      type: 'string | number',
      'x-decorator': 'FormItem',
      'x-component': 'ValueInput',
      'x-component-props': {
        include: ['TEXT', 'NUMBER'],
      },
    },
    autoplay: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {},
    },
    height: {
      type: 'string | number',
      'x-decorator': 'FormItem',
      'x-component': 'SizeInput',
      'x-component-props': {
        include: ['auto', 'px'],
      },
    },
  },
}

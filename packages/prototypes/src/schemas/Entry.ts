import type { ISchema } from '@formily/vue'

export const Entry: ISchema = {
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
    columns: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {
        min: 2,
      },
    },
    rows: {
      type: 'number',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {
        min: 0,
      },
    },
    gutter: {
      type: 'string | number',
      'x-decorator': 'FormItem',
      'x-component': 'SizeInput',
      'x-component-props': {
        include: ['inherit', 'px', 'em', 'rem'],
        min: 0,
        step: 0.1,
      },
      'x-reactions': (field) => {
        const rows = field.form?.values?.['x-component-props']?.rows
        field.visible = rows && rows > 0
      },
    },
    itemProps: {
      type: 'object',
      properties: {
        iconImgSize: {
          type: 'string | number',
          'x-decorator': 'FormItem',
          'x-component': 'SizeInput',
          'x-component-props': {
            include: ['inherit', 'px'],
          },
        },
        iconFontSize: {
          type: 'string | number',
          'x-decorator': 'FormItem',
          'x-component': 'SizeInput',
          'x-component-props': {
            include: ['inherit', 'px'],
          },
        },
      },
    },
  },
}

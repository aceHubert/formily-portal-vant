import type { ISchema } from '@formily/vue'

export const PageContainer: ISchema = {
  type: 'object',
  properties: {
    width: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'SizeInput',
      'x-component-props': {
        include: ['inherit', 'px'],
      },
    },
  },
}

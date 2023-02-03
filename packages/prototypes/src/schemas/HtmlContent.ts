import type { ISchema } from '@formily/vue'

export const HtmlContent: ISchema = {
  type: 'object',
  properties: {
    content: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {},
    },
  },
}

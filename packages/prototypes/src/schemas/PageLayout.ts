import type { ISchema } from '@formily/vue'

export const PageLayout: ISchema = {
  type: 'object',
  properties: {
    'themeVars.primary': {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'ColorInput',
      'x-component-props': {
        popupProps: {
          placement: 'bottom',
        },
        colorPickerProps: {
          disableAlpha: true,
        },
      },
    },
    shallow: {
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
  },
}

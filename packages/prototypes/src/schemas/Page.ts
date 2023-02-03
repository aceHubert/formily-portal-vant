import { PageLayout } from './PageLayout'
import { CSSStyle } from './CSSStyle'
import type { ISchema } from '@formily/vue'

export const Page: ISchema = {
  type: 'object',
  properties: {
    ...(PageLayout.properties as Exclude<ISchema['properties'], string>),
    style: CSSStyle,
  },
}

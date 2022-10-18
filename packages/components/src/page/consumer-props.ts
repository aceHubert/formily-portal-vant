// Types
import type { PageProps } from './index'

export const PageConsumerProps: Required<
  Pick<PageProps, 'containerWidth' | 'themeVars'>
> = {
  containerWidth: '100%',
  themeVars: {
    primary: '#046bde˝',
  },
}

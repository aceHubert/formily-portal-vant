import { warn } from '../__builtins__/shared/utils'

// Types
import type { PageProps } from './index'

export const PageConsumerProps: Required<
  Pick<PageProps, 'containerWidth' | 'themeVars' | 'dataRequest'> & {
    scopedDataRequest: Extract<PageProps['scopedDataRequest'], Function>
  }
> = {
  containerWidth: '100%',
  themeVars: {
    primary: '#046bde˝',
  },
  scopedDataRequest: async (ids) => {
    warn(
      process.env.NODE_ENV === 'production',
      'using default "scopedDataRequest" function, all results will be true!'
    )

    const result = ids.reduce((prev, curr) => {
      prev[curr] = true
      return prev
    }, {} as Record<string, boolean>)
    return Promise.resolve(result)
  },
  dataRequest: () => {
    warn(
      process.env.NODE_ENV === 'production',
      'using default "scopedDataRequest" function, will return null!'
    )

    return Promise.resolve(null)
  },
}

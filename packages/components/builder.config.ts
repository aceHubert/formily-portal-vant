import type { IBuilderConfig } from '@formily/template'

export const BuilderConfig: IBuilderConfig = {
  targetLibName: 'lj-portal-vant',
  targetLibCjsDir: 'lib',
  targetLibEsDir: 'es',
  externals: {
    vant: 'Vant',
  },
}

import type { IBuilderConfig } from '@formily/template'

export const BuilderConfig: IBuilderConfig = {
  targetLibName: 'vant',
  targetLibCjsDir: 'lib',
  targetLibEsDir: 'es',
  externals: {
    vant: 'Vant',
    axios: 'Axios',
  },
}

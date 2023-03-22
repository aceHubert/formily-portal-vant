import { IBuilderConfig } from '@formily/template'

export const BuilderConfig: IBuilderConfig = {
  targetLibName: 'vant',
  targetLibCjsDir: 'lib',
  targetLibEsDir: 'es',
  externals: {
    '@formily-portal/vant': 'FormilyPortal.Vant',
    '@formily/antdv': 'Formily.Antdv',
    '@formily/antdv-designable': 'Formily.AntdvDesignable',
    '@formily/antdv-setters': 'Formily.AntdvSetters',
    '@formily/antdv-settings-form': 'Formily.AntdvSettingsForm',
    '@ckeditor/ckeditor5-build-balloon': 'BalloonEditor',
  },
}

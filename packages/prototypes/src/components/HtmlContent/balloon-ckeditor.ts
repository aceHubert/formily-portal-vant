import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough'
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline'
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize'
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor'
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor'
import Indent from '@ckeditor/ckeditor5-indent/src/indent'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice'

export default class BalloonEditor extends BalloonEditorBase {}

// Plugins to include in the build.
BalloonEditor.builtinPlugins = [
  Essentials,
  Autoformat,
  Bold,
  Italic,
  Strikethrough,
  Underline,
  FontSize,
  FontColor,
  FontBackgroundColor,
  Indent,
  Paragraph,
  PasteFromOffice,
]

// Editor configuration.
BalloonEditor.defaultConfig = {
  toolbar: {
    items: [
      'bold',
      'italic',
      'strikethrough',
      'underline',
      'highlight',
      '|',
      'fontSize',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'undo',
      'redo',
    ],
  },
  fontSize: {
    options: [9, 10, 12, 14, 18, 22, 28],
  },
  // This value must be kept in sync with the language defined in webpack.config.js.
  language: 'en',
}

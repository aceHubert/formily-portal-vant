import { Entry as FormilyEntry } from '@lj-portal/vant'
import { composeExport } from '@formily/vant/esm/__builtins__'
import { createBehavior, createResource } from '@designable/core'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { createFieldSchema } from '../Field'

export const Entry = composeExport(FormilyEntry, {
  Behavior: createBehavior({
    name: 'Entry',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Entry',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Entry),
    },
    designerLocales: AllLocales.Entry,
  }),
  Resource: createResource({
    icon: (
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <path
          d="M314.38 307.13V174.02c0-18.47 14.97-33.45 33.45-33.45h75.97c18.47 0 33.45 14.97 33.45 33.45v133.11c0 18.47-14.97 33.45-33.45 33.45h-75.97c-18.47-0.01-33.45-14.98-33.45-33.45zM62 307.13V174.02c0-18.47 14.97-33.45 33.45-33.45h75.97c18.47 0 33.45 14.97 33.45 33.45v133.11c0 18.47-14.97 33.45-33.45 33.45H95.45C76.97 340.57 62 325.6 62 307.13zM819.14 307.13V174.02c0-18.47 14.97-33.45 33.45-33.45h75.97c18.47 0 33.45 14.97 33.45 33.45v133.11c0 18.47-14.97 33.45-33.45 33.45h-75.97c-18.47-0.01-33.45-14.98-33.45-33.45zM566.76 307.13V174.02c0-18.47 14.97-33.45 33.45-33.45h75.97c18.47 0 33.45 14.97 33.45 33.45v133.11c0 18.47-14.97 33.45-33.45 33.45h-75.97c-18.47-0.01-33.45-14.98-33.45-33.45zM314.38 578.55v-133.1c0-18.47 14.97-33.45 33.45-33.45h75.97c18.47 0 33.45 14.97 33.45 33.45v133.11c0 18.47-14.97 33.45-33.45 33.45h-75.97c-18.47-0.01-33.45-14.98-33.45-33.46zM62 578.55v-133.1C62 426.97 76.97 412 95.45 412h75.97c18.47 0 33.45 14.97 33.45 33.45v133.11c0 18.47-14.97 33.45-33.45 33.45H95.45C76.97 612 62 597.03 62 578.55zM133.43 843.2V723.65c0-22.22 18.01-40.22 40.22-40.22h676.69c22.22 0 40.22 18.01 40.22 40.22V843.2c0 22.22-18.01 40.22-40.22 40.22H173.65c-22.21 0.01-40.22-18-40.22-40.22zM819.14 578.55v-133.1c0-18.47 14.97-33.45 33.45-33.45h75.97c18.47 0 33.45 14.97 33.45 33.45v133.11c0 18.47-14.97 33.45-33.45 33.45h-75.97c-18.47-0.01-33.45-14.98-33.45-33.46zM566.76 578.55v-133.1c0-18.47 14.97-33.45 33.45-33.45h75.97c18.47 0 33.45 14.97 33.45 33.45v133.11c0 18.47-14.97 33.45-33.45 33.45h-75.97c-18.47-0.01-33.45-14.98-33.45-33.46z"
          p-id="26383"
          fill="#999999"
        ></path>
      </g>
    ),
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string | number',
          enum: [
            {
              text: 'Entry1',
              icon: '//via.placeholder.com/100x100?text=1',
              linkUrl: 'javascript:;',
              linkTarget: '_blank',
            },
            {
              text: 'Entry2',
              icon: '//via.placeholder.com/100x100?text=2',
              linkUrl: 'javascript:;',
            },
            {
              text: 'Entry3',
              icon: '//via.placeholder.com/100x100?text=3',
              linkUrl: 'javascript:;',
            },
            {
              text: 'Entry4',
              icon: '//via.placeholder.com/100x100?text=4',
              linkUrl: 'javascript:;',
            },
            {
              text: 'Entry5',
              icon: '//via.placeholder.com/100x100?text=5',
              linkUrl: 'javascript:;',
            },
            {
              text: 'Entry6',
              icon: '//via.placeholder.com/100x100?text=6',
              linkUrl: 'javascript:;',
            },
            {
              text: 'Entry7',
              icon: '//via.placeholder.com/100x100?text=7',
              linkUrl: 'javascript:;',
            },
            {
              text: 'Entry8',
              icon: '//via.placeholder.com/100x100?text=8',
              linkUrl: 'javascript:;',
            },
            {
              text: 'Entry9',
              icon: '//via.placeholder.com/100x100?text=9',
              linkUrl: 'javascript:;',
            },
          ],
          'x-component': 'Entry',
          'x-component-props': {},
        },
      },
    ],
  }),
})

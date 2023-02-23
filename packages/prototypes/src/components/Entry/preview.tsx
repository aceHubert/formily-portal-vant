import { Entry as FormilyEntry } from '@lj-portal/vant'
import { composeExport } from '@lj-portal/vant/esm/__builtins__'
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
      <g
        id="页面-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g id="金刚位" fill-rule="nonzero">
          <rect
            id="矩形"
            fill="#FFFFFF"
            opacity="0"
            x="0"
            y="0"
            width="1024"
            height="1024"
          ></rect>
          <path
            d="M944,0 C988.18278,0 1024,35.81722 1024,80 L1024,944 C1024,988.18278 988.18278,1024 944,1024 L80,1024 C35.81722,1024 0,988.18278 0,944 L0,80 C0,35.81722 35.81722,0 80,0 L944,0 Z M944,20 L80,20 C47.1942859,20 20.5378857,46.328343 20,79.0077903 L20,80 L20,944 C20,976.805714 46.328343,1003.46211 79.0077903,1004 L80,1004 L944,1004 C976.805714,1004 1003.46211,977.671657 1004,944.99221 L1004,944 L1004,80 C1004,47.1942859 977.671657,20.5378857 944.99221,20 L944,20 Z"
            id="形状"
            fill="#999999"
          ></path>
          <rect
            id="矩形"
            fill="#1890FF"
            transform="translate(823.000000, 345.000000) scale(-1, 1) rotate(-90.000000) translate(-823.000000, -345.000000) "
            x="758"
            y="295"
            width="130"
            height="100"
            rx="10"
          ></rect>
          <rect
            id="矩形备份-4"
            fill="#1890FF"
            transform="translate(823.000000, 679.000000) scale(-1, 1) rotate(-90.000000) translate(-823.000000, -679.000000) "
            x="758"
            y="629"
            width="130"
            height="100"
            rx="10"
          ></rect>
          <rect
            id="矩形备份"
            fill="#1890FF"
            transform="translate(616.000000, 345.000000) scale(-1, 1) rotate(-90.000000) translate(-616.000000, -345.000000) "
            x="551"
            y="295"
            width="130"
            height="100"
            rx="10"
          ></rect>
          <rect
            id="矩形备份-5"
            fill="#1890FF"
            transform="translate(616.000000, 679.000000) scale(-1, 1) rotate(-90.000000) translate(-616.000000, -679.000000) "
            x="551"
            y="629"
            width="130"
            height="100"
            rx="10"
          ></rect>
          <rect
            id="矩形备份-2"
            fill="#1890FF"
            transform="translate(408.000000, 345.000000) scale(-1, 1) rotate(-90.000000) translate(-408.000000, -345.000000) "
            x="343"
            y="295"
            width="130"
            height="100"
            rx="10"
          ></rect>
          <rect
            id="矩形备份-6"
            fill="#1890FF"
            transform="translate(408.000000, 679.000000) scale(-1, 1) rotate(-90.000000) translate(-408.000000, -679.000000) "
            x="343"
            y="629"
            width="130"
            height="100"
            rx="10"
          ></rect>
          <rect
            id="矩形备份-3"
            fill="#1890FF"
            transform="translate(201.000000, 345.000000) scale(-1, 1) rotate(-90.000000) translate(-201.000000, -345.000000) "
            x="136"
            y="295"
            width="130"
            height="100"
            rx="10"
          ></rect>
          <rect
            id="矩形备份-7"
            fill="#1890FF"
            transform="translate(201.000000, 679.000000) scale(-1, 1) rotate(-90.000000) translate(-201.000000, -679.000000) "
            x="136"
            y="629"
            width="130"
            height="100"
            rx="10"
          ></rect>
        </g>
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

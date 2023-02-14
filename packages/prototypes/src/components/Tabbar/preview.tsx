import { createBehavior, createResource } from '@designable/core'
import { Tabbar as FormilyTabbar } from '@lj-portal/vant'
import { composeExport } from '@formily/vant/esm/__builtins__'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { createFieldSchema } from '../Field'
import './style.less'

export const Tabbar = composeExport(FormilyTabbar, {
  Behavior: createBehavior({
    name: 'Tabbar',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Tabbar',
    designerProps: {
      droppable: true,
      allowDrop(parent) {
        // 只允许在顶层的第一位并只能添加一次
        return (
          parent.isRoot &&
          !parent.children.some(
            (node) => node.props['x-component'] === 'Tabbar'
          )
        )
      },
      propsSchema: createFieldSchema(AllSchemas.Tabbar),
    },
    designerLocales: AllLocales.Tabbar,
  }),
  Resource: createResource({
    icon: (
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <path
          d="M463.12 575.96H121.7c-11.78 0-21.34 9.55-21.34 21.34v341.42c0 11.78 9.55 21.34 21.34 21.34h341.42c11.78 0 21.34-9.55 21.34-21.34V597.3c0-11.78-9.56-21.34-21.34-21.34zM420.39 881.7c0 7.85-6.37 14.22-14.22 14.22H178.65c-7.85 0-14.22-6.37-14.22-14.22V654.18c0-7.85 6.37-14.22 14.22-14.22h227.52c7.85 0 14.22 6.37 14.22 14.22V881.7zM909.33 575.96H567.91c-11.78 0-21.34 9.55-21.34 21.34v341.42c0 11.78 9.55 21.34 21.34 21.34h341.42c11.78 0 21.34-9.55 21.34-21.34V597.3c0-11.78-9.55-21.34-21.34-21.34zM866.6 881.7c0 7.85-6.37 14.22-14.22 14.22H624.86c-7.85 0-14.22-6.37-14.22-14.22V654.18c0-7.85 6.37-14.22 14.22-14.22h227.52c7.85 0 14.22 6.37 14.22 14.22V881.7zM909.33 128.04H567.91c-11.78 0-21.34 9.55-21.34 21.34V490.8c0 11.78 9.55 21.34 21.34 21.34h341.42c11.78 0 21.34-9.55 21.34-21.34V149.38c0-11.78-9.55-21.34-21.34-21.34zM866.6 433.78c0 7.85-6.37 14.22-14.22 14.22H624.86c-7.85 0-14.22-6.37-14.22-14.22V206.26c0-7.85 6.37-14.22 14.22-14.22h227.52c7.85 0 14.22 6.37 14.22 14.22v227.52zM303.56 69.6c-7.12-7.12-18.67-7.12-25.79 0L71.49 275.88c-7.12 7.12-7.12 18.67 0 25.79l206.29 206.29c7.12 7.12 18.67 7.12 25.79 0l206.29-206.29c7.12-7.12 7.12-18.67 0-25.79L303.56 69.6z m122.17 227.05L298.61 423.77c-4.39 4.39-11.5 4.39-15.89 0L155.6 296.65c-4.39-4.39-4.39-11.5 0-15.89l127.12-127.12c4.39-4.39 11.5-4.39 15.89 0l127.12 127.12c4.39 4.39 4.39 11.5 0 15.89z"
          fill="#999999"
          p-id="2549"
        ></path>
      </g>
    ),
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string|number',
          enum: [
            {
              key: 1,
              icon: '//via.placeholder.com/100x100?text=1',
              text: 'Home',
              linkUrl: 'javascript:;',
            },
            {
              key: 2,
              icon: '//via.placeholder.com/100x100?text=2',
              text: 'Me',
              linkUrl: 'javascript:;',
              replace: true,
            },
          ],
          'x-component': 'Tabbar',
        },
      },
    ],
  }),
})

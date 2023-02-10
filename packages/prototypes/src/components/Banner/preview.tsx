import { Banner as FormilyBannner } from '@lj-portal/vant'
import { composeExport } from '@lj-portal/vant/esm/__builtins__'
import { createBehavior, createResource } from '@designable/core'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { createFieldSchema } from '../Field'

export const Banner = composeExport(FormilyBannner, {
  Behavior: createBehavior({
    name: 'Banner',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Banner',
    designerProps: {
      propsSchema: createFieldSchema(AllSchemas.Banner),
    },
    designerLocales: AllLocales.Banner,
  }),
  Resource: createResource({
    icon: (
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <path
          d="M805.161 152.774H202.323c-28.904 0-49.549 20.645-49.549 49.549V809.29c0 28.904 20.645 49.549 49.549 49.549H809.29c28.904 0 49.549-20.645 49.549-49.549V206.452c0-28.904-24.774-53.678-53.678-53.678zM202.323 813.42c0-4.129 0-4.129 0 0z m602.838-4.129L611.097 602.84l-94.968 82.58-144.516-136.258L227.097 685.42l-20.645 24.775V206.452h606.967V809.29zM648.258 507.871c53.677 0 94.968-41.29 94.968-94.968 0-53.677-41.29-94.968-94.968-94.968-53.677 0-94.968 41.29-94.968 94.968 0 49.549 41.29 94.968 94.968 94.968zM119.742 272.516v-49.548H57.806c-28.903 0-49.548 20.645-49.548 49.548v466.58c0 28.904 20.645 49.55 49.548 49.55h61.936v-49.55H57.806v-466.58h61.936z m763.87 466.58v49.55h66.065c28.904 0 49.549-20.646 49.549-49.55v-466.58c0-28.903-20.645-49.548-49.549-49.548h-61.935v49.548h61.935v466.58h-66.064z"
          fill="#999999"
          p-id="4335"
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
              key: 1,
              imageUrl:
                '//via.placeholder.com/750x400/FF0000/FFFFFF?text=Image1',
              linkUrl: 'javascript:;',
              linkTarget: '_blank',
            },
            {
              key: 2,
              imageUrl:
                '//via.placeholder.com/750x400/008000/FFFFFF?text=Image2',
            },
            {
              key: 3,
              imageUrl:
                '//via.placeholder.com/750x400/0000FF/FFFFFF?text=Image3',
            },
          ],
          'x-component': 'Banner',
          'x-component-props': {},
        },
      },
    ],
  }),
})

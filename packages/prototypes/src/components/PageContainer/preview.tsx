import { createBehavior, createResource } from '@designable/core'
import { PageContainer as FormilyPageContainer } from '@lj-portal/vant'
import { composeExport } from '@formily/vant/esm/__builtins__'
import { withContainer } from '../../common/Container'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { createVoidFieldSchema } from '../Field'

export const PageContainer = composeExport(
  withContainer(FormilyPageContainer),
  {
    Behavior: createBehavior({
      name: 'PageContainer',
      selector: (node) => node.props['x-component'] === 'PageContainer',
      designerProps: {
        droppable: true,
        allowDrop(parent) {
          // 只允许在顶层
          return parent.isRoot
        },
        propsSchema: createVoidFieldSchema(AllSchemas.PageContainer),
      },
      designerLocales: AllLocales.PageContainer,
    }),
    Resource: createResource({
      icon: (
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <path
            d="M381.6 864H162.4c-6.9 0-12.4 4.6-12.4 10.3v19.3c0 5.7 5.6 10.3 12.4 10.3h219.1c6.8 0 12.4-4.6 12.4-10.3v-19.3c0.1-5.7-5.5-10.3-12.3-10.3zM382 780.6H162c-6.9 0-12.5 4.6-12.5 10.3v19.3c0 5.7 5.6 10.3 12.5 10.3h220c6.9 0 12.5-4.6 12.5-10.3v-19.3c0-5.7-5.6-10.3-12.5-10.3zM162.4 737.2h219.1c6.8 0 12.4-4.6 12.4-10.3v-19.3c0-5.7-5.6-10.3-12.4-10.3H162.4c-6.9 0-12.4 4.6-12.4 10.3v19.3c0 5.7 5.6 10.3 12.4 10.3z"
            p-id="12421"
            fill="#999999"
          ></path>
          <path
            d="M977.1 0H46.9C21 0 0 21 0 46.9v930.2c0 25.9 21 46.9 46.9 46.9h930.2c25.9 0 46.9-21 46.9-46.9V46.9C1024 21 1003 0 977.1 0z m-18.7 911.6c0 25.9-21 46.9-46.9 46.9H112.4c-25.9 0-46.9-21-46.9-47V112.4c0-25.9 21-46.9 46.9-46.9h799.1c25.9 0 46.9 21 46.9 46.9v799.2z"
            p-id="12422"
            fill="#999999"
          ></path>
          <path
            d="M207.9 342.7h608.2c32 0 57.9-25.9 57.9-57.9v-83c0-32-25.9-57.9-57.9-57.9H207.9c-32 0-57.9 25.9-57.9 57.9v83c0 32 25.9 57.9 57.9 57.9zM200 201.8c0-4.4 3.5-7.9 7.9-7.9h608.2c4.4 0 7.9 3.5 7.9 7.9v83c0 4.4-3.5 7.9-7.9 7.9H207.9c-4.4 0-7.9-3.5-7.9-7.9v-83zM806.4 405.7h-277c-37.3 0-67.6 30.2-67.6 67.6v363.2c0 37.3 30.2 67.6 67.6 67.6h277c37.3 0 67.6-30.2 67.6-67.6V473.3c0-37.4-30.2-67.6-67.6-67.6zM824 836.4c0 9.7-7.9 17.6-17.6 17.6h-277c-9.7 0-17.6-7.9-17.6-17.6V473.3c0-9.7 7.9-17.6 17.6-17.6h277c9.7 0 17.6 7.9 17.6 17.6v363.1zM272 649.7c67.4 0 122-54.6 122-122s-54.6-122-122-122-122 54.6-122 122 54.6 122 122 122z m0-204c45.2 0 82 36.8 82 82s-36.8 82-82 82-82-36.8-82-82 36.8-82 82-82z"
            p-id="12423"
            fill="#999999"
          ></path>
        </g>
      ),
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'PageContainer',
          },
        },
      ],
    }),
  }
)

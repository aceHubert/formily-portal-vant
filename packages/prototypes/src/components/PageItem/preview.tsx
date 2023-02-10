import { defineComponent } from 'vue-demi'
import { createBehavior, createResource } from '@designable/core'
import { uid } from '@designable/shared'
import {
  useTreeNode,
  TreeNodeWidget,
  DroppableWidget,
} from '@formily/antdv-designable'
import { PageItem as FormilyPageItem } from '@lj-portal/vant'
import { composeExport } from '@lj-portal/vant/esm/__builtins__'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { createVoidFieldSchema } from '../Field'

export const PageItem = composeExport(
  defineComponent({
    name: 'DnNavbar',
    props: {
      title: {},
      titleRight: {},
    },
    setup(props, { attrs }) {
      const nodeRef = useTreeNode()

      return () => {
        const node = nodeRef.value

        return (
          <FormilyPageItem
            class="dn-page-item"
            attrs={attrs}
            scopedSlots={{
              title: () => (
                <span data-content-editable="x-component-props.title">
                  {props.title}
                </span>
              ),
              titleRight: () => (
                <span data-content-editable="x-component-props.titleRight">
                  {props.titleRight}
                </span>
              ),
            }}
          >
            {node.children.length ? (
              node.children.map((child) => (
                <TreeNodeWidget key={uid()} node={child} />
              ))
            ) : (
              <DroppableWidget key={uid()} node={node} />
            )}
          </FormilyPageItem>
        )
      }
    },
  }),
  {
    Behavior: createBehavior({
      name: 'PageItem',
      selector: (node) => node.props['x-component'] === 'PageItem',
      designerProps: {
        droppable: true,
        allowDrop(parent) {
          // 只允许在顶层或PageContainer中
          return (
            parent.isRoot || parent.props['x-component'] === 'PageContainer'
          )
        },
        propsSchema: createVoidFieldSchema(AllSchemas.PageItem),
      },
      designerLocales: AllLocales.PageItem,
    }),
    Resource: createResource({
      icon: (
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <path
            d="M804.571429 0v219.428571H219.428571V0h585.142858z m219.428571 950.857143H0v73.142857h1024v-73.142857z m0-658.285714H0v73.142857h1024v-73.142857zM877.714286 585.142857v219.428572H146.285714V585.142857h731.428572m73.142857-73.142857H73.142857v365.714286h877.714286V512z"
            p-id="28075"
            fill="#999999"
          ></path>
        </g>
      ),
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'PageItem',
            'x-component-props': {
              title: 'Title',
              titleRightLinkTarget: '_self',
            },
          },
        },
      ],
    }),
  }
)

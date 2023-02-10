import { defineComponent } from 'vue-demi'
import { createForm } from '@formily/core'
import { FormProvider as _FormProvider, h, useForm } from '@formily/vue'
import { warn } from '../__builtins__'
import { PageLayout } from '../page-layout'
import { PreviewText } from '../preview-text'

// Types
import type { Component, VNode } from 'vue'
import type { Form as FormType } from '@formily/core'

const FormProvider = _FormProvider as unknown as Component

export interface PageProps {
  form?: FormType
  component?: Component | string
  previewTextPlaceholder: string | (() => VNode)
}

export const Page = defineComponent({
  name: 'Page',
  props: ['form', 'component', 'previewTextPlaceholder'],
  setup(props, { attrs, slots, listeners }) {
    const top = useForm()

    return () => {
      const {
        form,
        component = 'div',
        previewTextPlaceholder = slots?.previewTextPlaceholder,
      } = props

      const renderContent = () => {
        return h(
          PreviewText.Placeholder,
          {
            props: {
              value: previewTextPlaceholder,
            },
          },
          {
            default: () => [
              h(
                PageLayout,
                {
                  attrs: {
                    ...attrs,
                  },
                },
                {
                  default: () => [
                    h(
                      component,
                      {
                        on: listeners,
                      },
                      slots
                    ),
                  ],
                }
              ),
            ],
          }
        )
      }

      if (form) {
        return h(
          FormProvider,
          { props: { form } },
          {
            default: () => renderContent(),
          }
        )
      }

      warn(
        !!top.value,
        '"form" is not provide, will create a form by default! '
      )

      if (top.value) {
        return renderContent()
      } else {
        return h(
          FormProvider,
          { props: { form: createForm() } },
          { default: () => renderContent() }
        )
      }
    }
  },
})

export default Page

import { defineComponent, computed } from 'vue-demi'
import { Tag } from 'ant-design-vue'
import { isArr, isValid } from '@formily/shared'
import { observer } from '@formily/reactive-vue'
import { h, useField } from '@formily/vue'
import {
  createContext,
  resolveComponent,
  useContext,
  composeExport,
} from '../__builtins__'


const PlaceholderContext = createContext('N/A')

export const usePlaceholder = (value?: any) => {
  const placeholderCtx = useContext(PlaceholderContext)
  const placeholder = computed(() => {
    return isValid(value) && value !== ''
      ? value
      : resolveComponent(placeholderCtx.value) || 'N/A'
  })

  return placeholder
}

export const PreviewText = composeExport(Text, {
  Placeholder: PlaceholderContext.Provider,
  usePlaceholder,
})

export default PreviewText

import { inject } from 'vue-demi'
import { hasSymbol } from '../__builtins__/shared'
import { PageConsumerProps } from './consumer-props'

export const PageInjectKey = hasSymbol ? Symbol() : '__PAGE_INJECT_KEY__'

export function usePage(defaultValue = PageConsumerProps) {
  const page = inject(PageInjectKey, defaultValue)
  return page
}

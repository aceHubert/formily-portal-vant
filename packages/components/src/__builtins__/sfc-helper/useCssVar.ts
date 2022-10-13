import {
  getCurrentInstance,
  watchPostEffect,
  // useCssVars as useCssVarsV3,
} from 'vue-demi'
import { inBrowser, warn } from '../shared/utils'

/**
 * Runtime helper for SFC's CSS variable injection feature.
 * @private
 */
function useCssVarsCompatible(
  getter: (
    vm: Record<string, any>,
    setupProxy: Record<string, any>
  ) => Record<string, string>
) {
  if (!inBrowser) return

  const instance = getCurrentInstance()
  if (!instance) {
    warn(
      false,
      `useCssVars is called without current active component instance.`
    )
    return
  }

  watchPostEffect(() => {
    const el = instance.proxy.$el
    // @ts-expect-error type does not export
    const vars = getter(instance, instance._setupProxy!)
    if (el && el.nodeType === 1) {
      const style = (el as HTMLElement).style
      for (const key in vars) {
        style.setProperty(`--${key}`, vars[key])
      }
    }
  })
}

export const useCssVars = useCssVarsCompatible

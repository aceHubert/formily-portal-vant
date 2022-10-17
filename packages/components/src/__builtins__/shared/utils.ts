export const hasSymbol = typeof Symbol === 'function' && Symbol.for

export function isVnode(element: any): boolean {
  return (
    element &&
    typeof element === 'object' &&
    'componentOptions' in element &&
    'context' in element &&
    element.tag !== undefined
  )
}

export function isVueOptions(options: Record<string, any>) {
  return (
    options &&
    (typeof options.template === 'string' ||
      typeof options.render === 'function')
  )
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function composeExport<T0 extends {}, T1 extends {}>(
  s0: T0,
  s1: T1
): T0 & T1 {
  return Object.assign(s0, s1)
}

export function isEmptyElement(c: any) {
  return !(c.tag || (c.text && c.text.trim() !== ''))
}

export function filterEmpty(children = []) {
  return children.filter((c) => !isEmptyElement(c))
}

export const inBrowser = typeof window !== 'undefined'

export function warn(condition: boolean, format: string, ...args: any[]) {
  if (format === undefined) {
    throw new Error(
      '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
    )
  }

  if (!condition) {
    let argIndex = 0
    const message =
      '[@lj-portal/vant]: ' +
      format.replace(/%s/g, function () {
        return args[argIndex++]
      })
    if (typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.error(message)
    }
  }
}

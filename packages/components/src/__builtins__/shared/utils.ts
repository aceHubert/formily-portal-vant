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

export function equals(x: any, y: any) {
  const f1 = x instanceof Object
  const f2 = y instanceof Object
  if (!f1 || !f2) {
    return x === y
  }
  if (Object.keys(x).length !== Object.keys(y).length) {
    return false
  }
  const newX = Object.keys(x)
  for (let p in newX) {
    p = newX[p]
    const a = x[p] instanceof Object
    const b = y[p] instanceof Object
    if (a && b) {
      const result = equals(x[p], y[p])
      if (!result) return false
    } else if (x[p] !== y[p]) {
      return false
    }
  }
  return true
}

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
      '[@formily-portal/vant]: ' +
      format.replace(/%s/g, function () {
        return args[argIndex++]
      })
    if (typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.error(message)
    }
  }
}

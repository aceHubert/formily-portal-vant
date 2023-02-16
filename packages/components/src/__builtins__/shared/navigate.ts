/**
 * 绝对URL跳转
 * @param {string} url 目标URL
 * @param {boolean} replace 是否使用replace方式跳转
 */
export function absoluteGo(url: string, replace = false) {
  try {
    window.location[replace ? 'replace' : 'assign'](url)
  } catch (e) {
    window.location.href = url
  }
}

// 判断是否是绝对路径
export function isAbsoluteUrl(url: string) {
  return /^((https?:)?\/\/|\/\/)[\w.]+\/?/gi.test(url)
}

/**
 * URL跳转
 * @param {Rawlocation} url 目标URL
 * @param {boolean} replace 是否使用replace方式跳转
 */
export function navigateTo(
  url: string,
  {
    replace = false,
    router,
  }: {
    replace?: boolean
    router?: { go: Function; push: Function; replace: Function }
  } = {}
) {
  if (!url) {
    throw new Error('invalid url')
  }

  const isStringUrl = typeof url === 'string'
  if (isStringUrl) {
    // prevent goTo('javascript?')
    if (/^javas/.test(url)) {
      return
    }
    if (url === 'BACK') {
      router?.go(-1)
      return
    }
    if (isAbsoluteUrl(url)) {
      return absoluteGo(url, replace)
    }
  }

  router?.[replace ? 'replace' : 'push'](url)
}

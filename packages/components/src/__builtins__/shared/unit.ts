/**
 * 置换样式单位
 */
export const parseStyleUnit = (arg: string | number, unit = 'px') => {
  return typeof arg === 'number' ? `${arg}${unit}` : arg
}

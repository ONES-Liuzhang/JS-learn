/**
 * 
 */

export const svgBaseProps = Object.freeze({
  width: '1em',
  height: '1em',
  fill: 'currentColor',
  'aria-hidden': 'true',
  focusable: 'false',
})

// 类型字典
export const typeMap = (() => {
  let map: {
    [key: string]: any
  } = {}
  const context = require.context('./svg/type', true, /\.svg$/)
  context.keys().forEach(key => {
    let name = key.slice(2, -4)
    if (!name) return
    name = name.replace(/\//g, '-')
    map[name] = context(key).default
  })
  return map
})()

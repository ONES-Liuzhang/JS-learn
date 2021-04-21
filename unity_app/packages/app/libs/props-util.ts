/* eslint-disable indent */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undefined */

export function getType(fn: any) {
  const match = fn && fn.toString().match(/^\s*function (\w+)/)
  return match ? match[1] : ''
}

const camelizeRE = /-(\w)/g
const camelize = (str: string) => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}
export const parseStyleText = (cssText: any = '', camel: any = undefined) => {
  const res = {}
  const listDelimiter = /;(?![^(]*\))/g
  const propertyDelimiter = /:(.+)/
  cssText.split(listDelimiter).forEach((item: any) => {
    if (item) {
      const tmp = item.split(propertyDelimiter)
      if (tmp.length > 1) {
        const k = camel ? camelize(tmp[0].trim()) : tmp[0].trim();
        (res as any)[k] = tmp[1].trim()
      }
    }
  })
  return res
}
// 
export const hasProp = (instance: any, prop: string) => {
  const $options = instance.$options
  if (!$options) return false
  const propsData = $options.propsData
  if (!propsData) return false
  return prop in propsData
}

export const slotHasProp = (slot: any, prop: string): boolean => {
  const $options = slot.componentOptions || {}
  const propsData = $options.propsData || {}
  return prop in propsData
}

export const filterProps = (props: any, propsData = {}) => {
  const res: any = {}
  Object.keys(props).forEach((k) => {
    if (k in propsData || props[k] !== undefined) {
      res[k] = props[k]
    }
  })
  return res
}

export const getScopedSlots = (ele: any) => {
  return (ele.data && ele.data.scopedSlots) || {}
}

// export const getSlots = (ele: any) => {
//   let componentOptions = ele.componentOptions || {}
//   if (ele.$vnode) {
//     componentOptions = ele.$vnode.componentOptions || {}
//   }
//   const children = ele.children || componentOptions.children || []
//   const slots: any = {}
//   children.forEach((child: any) => {
//     if (!isEmptyElement(child)) {
//       const name = (child.data && child.data.slot) || 'default'
//       slots[name] = slots[name] || []
//       slots[name].push(child)
//     }
//   })
//   return { ...slots, ...getScopedSlots(ele) }
// }

export const getSlot = (self: any, name = 'default', options = {}) => {
  return (self.$scopedSlots && self.$scopedSlots[name] && self.$scopedSlots[name](options)) || self.$slots[name] || []
}

export const getAllChildren = (ele: any) => {
  let componentOptions = ele.componentOptions || {}
  if (ele.$vnode) {
    componentOptions = ele.$vnode.componentOptions || {}
  }
  return ele.children || componentOptions.children || []
}

export const getSlotOptions = (ele: any) => {
  if (ele.fnOptions) {
    // 函数式组件
    return ele.fnOptions
  }
  let componentOptions = ele.componentOptions
  if (ele.$vnode) {
    componentOptions = ele.$vnode.componentOptions
  }
  return componentOptions ? componentOptions.Ctor.options || {} : {}
}

export const getOptionProps = (instance: any) => {
  if (instance.componentOptions) {
    const componentOptions = instance.componentOptions
    const { propsData = {}, Ctor = {} } = componentOptions
    const props = (Ctor.options || {}).props || {}
    const res = {}
    for (const [k, v] of Object.entries(props)) {
      const def = (v as any).default
      if (def !== undefined) {
        (res as any)[k] = typeof def === 'function' && getType((v as any).type) !== 'Function' ? def.call(instance) : def
      }
    }
    return { ...res, ...propsData }
  }
  const { $options = {}, $props = {} } = instance
  return filterProps($props, $options.propsData)
}

export const getComponentFromProp = (instance: any, prop: any, options: any = instance, execute: boolean = true) => {
  if (instance.$createElement) {
    const h = instance.$createElement
    const temp = instance[prop]
    if (temp !== undefined) {
      return typeof temp === 'function' && execute ? temp(h, options) : temp
    }
    return (instance.$scopedSlots[prop] && execute && instance.$scopedSlots[prop](options)) || instance.$scopedSlots[prop] || instance.$slots[prop] || undefined
  }
  const h = instance.context.$createElement
  const temp = getPropsData(instance)[prop]
  if (temp !== undefined) {
    return typeof temp === 'function' && execute ? temp(h, options) : temp
  }
  const slotScope = getScopedSlots(instance)[prop]
  if (slotScope !== undefined) {
    return typeof slotScope === 'function' && execute ? slotScope(h, options) : slotScope
  }
  const slotsProp: any = []
  const componentOptions = instance.componentOptions || {};
  (componentOptions.children || []).forEach((child: any) => {
    if (child.data && child.data.slot === prop) {
      if (child.data.attrs) {
        delete child.data.attrs.slot
      }
      if (child.tag === 'template') {
        slotsProp.push(child.children)
      } else {
        slotsProp.push(child)
      }
    }
  })
  return slotsProp.length ? slotsProp : undefined
}

// const getAllProps = (ele) => {
//   let data = ele.data || {}
//   let componentOptions = ele.componentOptions || {}
//   if (ele.$vnode) {
//     data = ele.$vnode.data || {}
//     componentOptions = ele.$vnode.componentOptions || {}
//   }
//   return { ...data.props, ...data.attrs, ...componentOptions.propsData }
// }

export const getPropsData = (ele: any) => {
  let componentOptions = ele.componentOptions
  if (ele.$vnode) {
    componentOptions = ele.$vnode.componentOptions
  }
  return componentOptions ? componentOptions.propsData || {} : {}
}
// const getValueByProp = (ele, prop) => {
//   return getPropsData(ele)[prop]
// }

export const getAttrs = (ele: any) => {
  let data = ele.data
  if (ele.$vnode) {
    data = ele.$vnode.data
  }
  return data ? data.attrs || {} : {}
}

// const getKey = (ele) => {
//   let key = ele.key
//   if (ele.$vnode) {
//     key = ele.$vnode.key
//   }
//   return key
// }

export function getEvents(child: any) {
  let events = {}
  if (child.componentOptions && child.componentOptions.listeners) {
    events = child.componentOptions.listeners
  } else if (child.data && child.data.on) {
    events = child.data.on
  }
  return { ...events }
}
// export function getClass(ele) {
//   if (!ele) return
//   let data = {}
//   if (ele.data) {
//     data = ele.data
//   } else if (ele.$vnode && ele.$vnode.data) {
//     data = ele.$vnode.data
//   }
//   const tempCls = data.class || {}
//   const staticClass = data.staticClass
//   let cls = {}
//   // eslint-disable-next-line no-unused-expressions
//   staticClass &&
//     staticClass.split(' ').forEach((c) => {
//       cls[c.trim()] = true
//     })
//   if (typeof tempCls === 'string') {
//     tempCls.split(' ').forEach((c) => {
//       cls[c.trim()] = true
//     })
//   } else if (Array.isArray(tempCls)) {
//     classNames(tempCls)
//       .split(' ')
//       .forEach((c) => {
//         cls[c.trim()] = true
//       })
//   } else {
//     cls = { ...cls, ...tempCls }
//   }
//   return cls
// }
// export function getStyle(ele, camel) {
//   if (!ele) return
//   let data = {}
//   if (ele.data) {
//     data = ele.data
//   } else if (ele.$vnode && ele.$vnode.data) {
//     data = ele.$vnode.data
//   }
//   let style = data.style || data.staticStyle
//   if (typeof style === 'string') {
//     style = parseStyleText(style, camel)
//   } else if (camel && style) {
//     // 驼峰化
//     const res = {}
//     Object.keys(style).forEach((k) => (res[camelize(k)] = style[k]))
//     return res
//   }
//   return style
// }

// export function getComponentName(opts) {
//   return opts && (opts.Ctor.options.name || opts.tag)
// }

export function isEmptyElement(c: any) {
  return !(c.tag || (c.text && c.text.trim() !== ''))
}

export function filterEmpty(children: VNode[] | undefined) {
  return children ? children.filter((c) => !isEmptyElement(c)) : []
}

// const initDefaultProps = (propTypes, defaultProps) => {
//   Object.keys(defaultProps).forEach((k) => {
//     if (propTypes[k]) {
//       // eslint-disable-next-line no-unused-expressions
//       propTypes[k].def && (propTypes[k] = propTypes[k].def(defaultProps[k]))
//     } else {
//       throw new Error(`not have ${k} prop`)
//     }
//   })
//   return propTypes
// }

// export function mergeProps() {
//   // eslint-disable-next-line prefer-rest-params
//   const args = [].slice.call(arguments, 0)
//   const props = {}
//   args.forEach((p = {}) => {
//     for (const [k, v] of Object.entries(p)) {
//       props[k] = props[k] || {}
//       if (isPlainObject(v)) {
//         Object.assign(props[k], v)
//       } else {
//         props[k] = v
//       }
//     }
//   })
//   return props
// }

export function isValidElement(element: any) {
  return element && typeof element === 'object' && 'componentOptions' in element && 'context' in element && element.tag !== undefined // remove text node
}

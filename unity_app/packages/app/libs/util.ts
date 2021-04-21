/* eslint-disable no-undefined */
/**
 * 工具函数
 */

export const emptyObject = Object.freeze({})
export function isUndef(v: any): boolean {
  return v === undefined || v === null
}

export function isDef(v: any): boolean {
  return v !== undefined && v !== null
}

export function isTrue(v: any): boolean {
  return v === true
}

export function isFalse(v: any): boolean {
  return v === false
}

/**
 * Check if value is primitive.
 */
export function isPrimitive(value: any): boolean {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'symbol' ||
    // tslint:disable-next-line: strict-type-predicates
    typeof value === 'boolean'
  )
}

export function isObject(obj: any): boolean {
  // tslint:disable-next-line: strict-type-predicates
  return obj !== null && typeof obj === 'object'
}

const _toString = Object.prototype.toString

export function toRawType(value: any): string {
  return _toString.call(value).slice(8, -1)
}

// tslint:disable-next-line: ban-types
export function isPlainObject(obj: any): boolean {
  return _toString.call(obj) === '[object Object]'
}

export function isRegExp(v: any): boolean {
  return _toString.call(v) === '[object RegExp]'
}

// tslint:disable-next-line: ban-types
export function isPromise(val: any): boolean {
  return (
    isDef(val) &&
    // tslint:disable-next-line: strict-type-predicates
    typeof val.then === 'function' &&
    // tslint:disable-next-line: strict-type-predicates
    typeof val.catch === 'function'
  )
}

export function isError(err: any): boolean {
  return _toString.call(err).indexOf('Error') > -1
}

// tslint:disable-next-line: ban-types
export function isFun(fun: any): boolean {
  return _toString.call(fun) === '[object Function]'
}

export function isArray(val: any): boolean {
  return _toString.call(val) === '[object Array]'
}

export function toString(val: any): string {
  if (val === null) return ''
  return Array.isArray(val) || (isPlainObject(val) && val.toString === _toString) ?
    JSON.stringify(val, null, 2) :
    String(val)
}

export function toNumber(val: string): number | string {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}

export function remove(arr: any[], item: any) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

export function generateUUID() {
  if (process.env.NODE_ENV === 'test') {
    return 'test-uuid'
  }
  let d = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x7) | 0x8).toString(16)
  })
  return uuid
}

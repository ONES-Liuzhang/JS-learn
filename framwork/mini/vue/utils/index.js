/** 是否为函数 RegExp的函数判断可能有问题 */
export function isFunction(value) {
  return typeof value === "function";
}

const _toString = Object.prototype.toString;
export function isPlainObject(obj) {
  return _toString.call(obj).slice(8, -1) === "Object";
}

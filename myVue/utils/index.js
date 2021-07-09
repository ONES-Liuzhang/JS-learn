/** 是否为函数 RegExp的函数判断可能有问题 */
function isFunction(value) {
  return typeof value === "function";
}

const _toString = Object.prototype.toString;
function isPlainObject(obj) {
  return _toString.call(obj).slice(8, -1) === "Object";
}

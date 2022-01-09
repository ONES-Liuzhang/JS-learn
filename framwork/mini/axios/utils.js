export function mergeOptions(conf1, conf2) {}

export function forEach(obj, fn) {
  if (!obj) return;

  if (isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else if (Object.prototype.toString.call(obj) === "[object Object]") {
    for (let key in obj) {
      fn.call(null, obj[key], key, obj);
    }
  }
}

const _toString = Object.prototype.toString;

const isType = (str) => (obj) => _toString(obj) === `[object ${str}]`;

export const isArray = isType("Array");

export const isPlainObject = isType("Object");

export const isDate = isType("Date");

/**
 * 合并
 *
 * 不会保留对原对象的引用
 */
export function merge(/** obj1, obj2, obj3 */) {
  const result = {};

  function assignValue(val, key) {
    if (typeof result[key] === "object" && typeof val === "object") {
      result[key] = merge(result[key], val);
    } else if (typeof val === "object") {
      result[key] = merge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (let i = 0; i < arguments.length; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
}

/**
 * 把 b 的属性扩展到 a
 */
export function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (typeof val === "function") {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });

  return a;
}

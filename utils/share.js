const _toString = Object.prototype.toString;

const isType = (type) => (obj) => _toString.call(obj) === `[object ${type}]`;

export const isFunction = isType("Function");

export const isPlainObject = isType("Object");

export const isArray = Array.isArray;

export const isString = (obj) => typeof obj === "string";

export const isNumber = (obj) => typeof obj === "number";

export const isNaN = Number.isNaN;

export const isUndefined = (obj) => typeof obj === "undefined";

export const isNull = (obj) => typeof obj === "null";

export const isDef = (obj) => obj !== undefined && obj !== null;

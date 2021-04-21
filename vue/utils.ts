export const isType = function (type: string): Function {
  return function (val: any) {
    return Object.prototype.toString.call(val) === type;
  };
};

export const isArray = isType("[object Array]");

export const isString = isType("[object String]");

export const isPlainObject = isType("[object Object]");

export const isFunction = isType("[object Function]");

export const isNumber = isType("[object Number]");

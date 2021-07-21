// 使用原生的Object.freeze 在为内部属性赋值时不会报错
function deepFreeze(obj = {}) {
  Object.freeze(obj);
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      deepFreeze(obj[key]);
    }
  });
}

// 手写freeze函数 可添加报错信息
function deepFreeze2(obj = {}) {
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    freeze(obj, key, obj[key]);
  });
}

function freeze(obj, key, value) {
  if (typeof obj[key] === "object") {
    deepFreeze2(obj[key]);
  }
  Object.defineProperty(obj, key, {
    get() {
      return value;
    },
    set() {
      console.error(`不允许修改${key}`);
    },
  });
}

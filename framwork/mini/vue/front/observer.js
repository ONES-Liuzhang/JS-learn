import Dep from "./dep.js";

// 劫持一个对象，使其可响应
export default class Observer {
  constructor(obj) {
    observe(obj);
  }
}

function observe(obj) {
  if (typeof obj !== "object" || obj === null) return obj;

  if (Array.isArray(obj)) {
    // 劫持数组方法
  } else {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

function defineReactive(obj, key, val) {
  observe(obj[key]);

  const dep = new Dep();

  let value = val;

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      if (Dep.target) {
        dep.addSub();
      }
      return value;
    },
    set(newVal) {
      if (value === newVal) return;
      observe(newVal);
      value = newVal;
      // 触发所有绑定在当前属性的watcher
      dep.notify();
    },
  });
}

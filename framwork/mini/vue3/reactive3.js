/**
 * 代理 key in obj
 *
 * in 操作符会调用对象的内部方法（internal method）[[HasProperty]]
 * 对应 Proxy 中代理的操作是 has
 *
 * effect(() => {
 *    "foo" in obj
 * })
 *
 */
const { track, trigger } = require("./effect.js");

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      track(target, key);
      // receiver 可以简单理解为 this
      return Reflect.get(target, key, receiver);
    },
    set(target, key, val) {
      target[key] = val;
      trigger(target, key);
    },
    has(target, key) {
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
  });
}

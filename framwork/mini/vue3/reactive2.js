/**
 * Proxy receiver
 *
 * obj = {
 *    foo: "foo"
 *    get bar() {
 *       return this.foo
 *    }
 * }
 *
 * proxy = reactive(obj)
 *
 * effect(() => {
 *    console.log(obj.bar)
 * })
 *
 * obj.foo = "foo2"
 *
 * 收集依赖的时候，调用了 proxy.bar，实际上内部调用了 proxy.foo 的值
 * 但是目前的代码 取到的实际是没被代理过的 obj.foo，需要使用 receiver 参数来使 this 指向正确
 *
 */
const { track, trigger } = require("./effect.js");

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, val) {
      target[key] = val;
      trigger(target, key);
    },
  });
}

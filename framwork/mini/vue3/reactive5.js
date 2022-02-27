/**
 * 原型链可能导致的多次触发问题
 *
 * 举例：
 * const obj = reactive({
 *    foo: "foo"
 * })
 * const proto = reactive({
 *    bar: "bar"
 * })
 *
 * Object.setPrototypeOf(obj, proto)
 *
 * effect(() => {
 *    console.log(obj.bar)
 * })
 *
 * obj.bar = "bar2"
 *
 */
const { track, trigger, ITERATE_KEY, effect } = require("./effect.js");

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      // 让 proxy.raw 指向源对象
      if (key === "raw") {
        return target;
      }

      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, val, receiver) {
      let oldVal = target[key];
      const type = Object.prototype.hasOwnProperty.call(target, key)
        ? "SET"
        : "ADD";

      const res = Reflect.set(target, key, val, receiver);

      // oldVal 和 val 不相等，并且都不是 NaN 的情况下才更新
      // receiver.raw === target，表示当前触发的 setter 是对象本身触发的，而不是原型链上的属性触发
      if (
        receiver.raw === target &&
        oldVal !== val &&
        (oldVal === oldVal || val === val)
      ) {
        trigger(target, key, type);
      }

      return res;
    },
    // key in obj
    has(target, key, receiver) {
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    // for in
    ownKeys(target) {
      track(target, ITERATE_KEY);
      return Reflect.ownKeys(target);
    },
    // delete obj.key
    deleteProperty(target, key) {
      const hadKey = Object.prototype.hasOwnProperty.call(target, key);
      // 这里不需要传递 receiver 因为删除的是对象自己的属性
      const res = Reflect.deleteProperty(target, key);

      // 是对象自己的 key 并且删除成功时才触发 trigger
      if (hadKey && res) {
        trigger(target, key, "DELETE");
      }
    },
  });
}

/** ---------- demo ----------- */
const obj = reactive({
  foo: "foo",
});

const proto = reactive({
  bar: "bar",
});

Object.setPrototypeOf(obj, proto);

effect(() => {
  console.log(obj.bar);
});

obj.bar = "bar2";

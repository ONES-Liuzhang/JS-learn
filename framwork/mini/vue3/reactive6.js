/**
 * 浅响应和深响应
 */
const { track, trigger, ITERATE_KEY, effect } = require("./effect.js");

function reactive(obj) {
  return createReactive(obj, false);
}

function shallowReactive(obj) {
  return createReactive(obj, true);
}

function createReactive(obj, isShallow = false) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      // 让 proxy.raw 指向源对象
      if (key === "raw") {
        return target;
      }

      track(target, key);
      const res = Reflect.get(target, key, receiver);

      if (isShallow) {
        return res;
      }

      // 暂时只考虑对象
      if (res !== null && typeof res === "object") {
        return reactive(res);
      }

      return res;
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
  foo: {
    bar: 2,
  },
});
effect(() => {
  console.log(obj.foo.bar);
});

obj.foo.bar = 3;

const shallowObj = shallowReactive({
  foo: {
    bar: "bar",
  },
});
effect(() => {
  console.log(shallowObj.foo.bar);
});

shallowObj.foo.bar = "baz";

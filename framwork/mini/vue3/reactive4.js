/**
 * 代理 for in
 *
 * for(let k in obj) 内部会调用 Reflect.ownKeys
 * 对应的 Proxy 代理的方法也是 ownKeys
 *
 * 使用 ITERATE_KEY 来标识触发了 for in，并调用 track 收集当前的副作用函数
 *
 * effect(function effectFn() {
 *    for(const k in obj) {
 *        // 其他逻辑
 *    }
 * })
 *
 * |- obj
 *  |- ITERATE_KEY
 *    |- effectFn
 *
 * 何时触发？
 * 1.新增属性 -> set
 * 2.删除属性
 *
 * ⚠️ 注意，在仅仅修改属性值时不应该触发 effectFn
 * 跳转到 effect.js 并且修改 trigger 的内容
 *
 */
const { track, trigger, ITERATE_KEY, effect } = require("./effect.js");

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      track(target, key);
      // receiver 可以简单理解为 this
      return Reflect.get(target, key, receiver);
    },
    set(target, key, val, receiver) {
      // 判断 set 是新增了属性还是改变了属性
      const type = Object.prototype.hasOwnProperty.call(target, key)
        ? "SET"
        : "ADD";

      Reflect.set(target, key, val, receiver);

      trigger(target, key, type);
    },
    has(target, key) {
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    ownKeys(target) {
      // 收集
      track(target, ITERATE_KEY);
      return Reflect.ownKeys(target);
    },
  });
}

/** ---------- demo ----------- */
const obj = reactive({
  foo: "foo",
});

effect(function effectFn() {
  console.log("触发");
  for (const k in obj) {
    // 其他逻辑
    obj[k];
  }
});

obj.foo = "bar";
obj.bar = "aa";

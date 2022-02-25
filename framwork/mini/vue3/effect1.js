/**
 * effect(function effectFn() {
 *    document.body.innerHtml = data.text
 * })
 *
 * 希望 data.text 在改变时可以执行 effectFn 来更新 document.body.innerHtml 的值
 *
 * 数据劫持
 * Object.defineProperty  Vue2
 * Proxy Vue3
 *
 * 使用 activeEffect 来保存需要触发的函数，保证就算是匿名函数也可以被正确收集
 *
 */
let effectsMap = new WeakMap();
let activeEffect;

function effect(fn) {
  activeEffect = fn;
  fn();
}

const obj = {
  text: "Hello World",
};
const proxy = new Proxy(obj, {
  get(target, key) {
    if (!activeEffect) return;

    let depsMap = effectsMap.get(target);
    if (!depsMap) {
      effectsMap.set(target, (depsMap = new Map()));
    }

    let deps = depsMap.get(key);
    if (!deps) {
      depsMap.set(key, (deps = new Set()));
    }

    deps.add(activeEffect);

    return target[key];
  },
  set(target, key, val) {
    const depsMap = effectsMap.get(target);
    if (!depsMap) return;

    const deps = depsMap.get(key);

    target[key] = val;
    deps && deps.forEach((fn) => fn());
  },
});

effect(() => {
  console.log("obj.text改变: ", proxy.text);
});

setTimeout(() => {
  proxy.text = "Good Bye";
}, 1000);

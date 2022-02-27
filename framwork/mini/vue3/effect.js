/**
 * 在 effect6 的基础上增加了 effectFn 的返回值，把它当成 fn 的包装函数
 *
 * 并增加了 lazy 的判断，为 computed 提供支持，初始化时不会进行 effectFn 的调用，而是将函数返回出去
 * 由外部来决定何时调用并收集依赖
 * 并且保证 effectFn 的返回值就是 fn 的返回值
 */
let effectsMap = new WeakMap();
let activeEffect;
const effectStack = [];

const ITERATE_KEY = Symbol();

function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn);

    activeEffect = effectFn;
    effectStack.push(activeEffect);

    const res = fn();

    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];

    // 保证 effectFn 的返回值就是 fn 的返回值
    return res;
  };

  effectFn.deps = [];
  effectFn.options = options;

  // 对 lazy 的判断，提供 computed 函数的支持
  // 如果配置了 lazy 属性，该副作用不会立即执行，而是返回给外部，供外部决定收集依赖的时机
  if (!options.lazy) {
    effectFn();
  }

  // 返回 effectFn 让外部可以调用
  return effectFn;
}

function track(target, key) {
  if (!activeEffect) return;

  let depsMap = effectsMap.get(target);
  if (!depsMap) {
    effectsMap.set(target, (depsMap = new Map()));
  }

  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }

  dep.add(activeEffect);

  activeEffect.deps.push(dep);
}

// type 用于标识触发 trigger 时是否新增了属性，如果新增，则需要执行 ITERATE_KEY 对应的依赖
function trigger(target, key, type) {
  const depsMap = effectsMap.get(target);
  if (!depsMap) return;

  const deps = depsMap.get(key);

  const effectsToRun = new Set();
  deps &&
    deps.forEach((effectFn) => {
      if (activeEffect !== effectFn) {
        effectsToRun.add(effectFn);
      }
    });

  // 新增或删除属性时才触发 for in 的改变
  if (type === "ADD" || type === "DELETE") {
    const iterateEffects = depsMap.get(ITERATE_KEY);
    iterateEffects &&
      iterateEffects.forEach((effectFn) => {
        if (activeEffect !== effectFn) {
          effectsToRun.add(effectFn);
        }
      });
  }

  effectsToRun.forEach((effectFn) => {
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn);
    } else {
      effectFn();
    }
  });
}

// 清空 dep <-> effectFn 的双向依赖
function cleanup(effect) {
  const deps = effect.deps;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
    deps.length = 0;
  }
}

module.exports = {
  effect,
  track,
  trigger,
  activeEffect,
  ITERATE_KEY,
};

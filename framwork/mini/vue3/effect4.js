/**
 * 循环调用
 *
 * 下面这个例子，我们期望的是它只被触发一次，实际上会无限循环触发
 * effect(function effectFn() {
 *    obj.num ++
 * })
 *
 * js 的运行顺序是，先计算 = 右侧，再赋值给左侧
 * obj.num ++   =>    obj.num = obj.num + 1
 *
 * 执行步骤
 * 1. effectFn 执行        ⬅️ ⬅️ ⬅️ ⬅️ ⬅️ ⬅️ ⬅️ ⬅️ ⬅️ ⬅️ ⬅️ ⬅️ ⬆️
 * 2. track：obj.num getter触发，收集依赖            ⬆️
 *    |- obj                                      ⬆️
 *      |- num                                    ⬆️
 *        |- effectFn                             ⬆️
 * 3. trigger：obj.num = num + 1 setter触发，[effectFn 执行]
 *
 * 问题出在第三步 trigger 不应该再去触发 effectFn
 *
 */
let effectsMap = new WeakMap();
let activeEffect;

function effect(fn) {
  const effectFn = () => {
    if (activeEffect === effectFn) return;

    cleanup(effectFn);
    activeEffect = effectFn;
    fn();
    activeEffect = null;
  };

  effectFn.deps = [];
  effectFn();
  return effectFn;
}

const obj = {
  num: 0,
};
const proxy = new Proxy(obj, {
  get(target, key) {
    track(target, key);
    return target[key];
  },
  set(target, key, val) {
    target[key] = val;
    trigger(target, key);
  },
});

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

function trigger(target, key) {
  const depsMap = effectsMap.get(target);
  if (!depsMap) return;

  const deps = depsMap.get(key);

  // deps && deps.forEach((effectFn) => effectFn());
  // 解决无限循环问题
  // 使用 new Set(deps) 浅复制一份，保证每个 effectFn 只会被遍历一次，不会受到 deps 的变化影响
  if (deps) {
    const effectsToRun = new Set(deps);
    effectsToRun.forEach((effectFn) => effectFn());
  }
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

/** -------------- demo -------------- */
effect(() => {
  proxy.num++;
  console.log(proxy.num);
});

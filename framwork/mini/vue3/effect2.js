/**
 * 1.提取逻辑 track trigger
 * 2.cleanup 函数的作用
 *
 * 分析：
 * 比如下面的三元表达式：
 *
 * effect(() => {
 *   const text = proxy.ok ? proxy.text : "not ok";
 *   console.log(text);
 * });
 *
 * 当 proxy.ok 为 true时，依赖的收集情况如下
 *
 * |- proxy
 *    |- ok
 *        |- effectFn
 *    |- text
 *        |- effectFn
 *
 * 但是当 proxy.ok 在某个时刻被修改为 false 时，按道理来说 proxy.text 的依赖实际上就算触发了也是无效的
 * 当 proxy.text 被改变时，effectFn 会触发，但不会改变任何结果。
 *
 * |- proxy
 *    |- ok
 *        |- effectFn
 *    |- text
 *        |- effectFn ❌ 无效的触发
 *
 * 所以每次 effectFn 执行时需要先清除和 effectFn 相关的所有依赖，再重新收集依赖
 */
let effectsMap = new WeakMap();
let activeEffect;

function effect(fn) {
  const effectFn = () => {
    cleanup(effectFn);
    activeEffect = effectFn;
    fn();
  };

  effectFn.deps = [];
  effectFn();
  return effectFn;
}

const obj = {
  ok: true,
  text: "Hello World",
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

  deps && deps.forEach((effectFn) => effectFn());
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
  console.log("effectFn触发了！");
  proxy.ok ? proxy.text : "not ok";
});

proxy.ok = false;

setTimeout(() => {
  proxy.text = "Good Bye";
}, 1000);

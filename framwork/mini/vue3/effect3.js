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

  // deps && deps.forEach((effectFn) => effectFn());
  // 解决无限循环问题
  // 使用 new Set(deps) 浅复制一份，保证每个 effectFn 只会被遍历一次，不会受到 deps 的变化影响
  if (deps) {
    const newDepSet = new Set(deps);
    newDepSet.forEach((effectFn) => effectFn());
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
// initial 第一次触发
effect(() => {
  console.log("effectFn触发了！");
  proxy.ok ? proxy.text : "not ok";
});

// proxy.ok 改变 第二次触发
proxy.ok = false;

setTimeout(() => {
  // proxy.ok 为false  proxy.text的依赖被清除，不会触发
  proxy.text = "Good Bye";
}, 1000);

// 总共触发2次。 ✅

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key);
      return target[key];
    },
    set(target, key, val) {
      target[key] = val;
      trigger(target, key);
    },
  });
}

let activeEffect = null;
const effectsMap = new WeakMap();
const effectsStack = [];

function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn);

    activeEffect = effectFn;
    effectsStack.push(effectFn);

    const res = fn();

    effectsStack.pop();
    activeEffect = effectsStack[effectsStack.length - 1];
    return res;
  };

  effectFn.deps = [];
  effectFn.options = options;

  if (!options.lazy) {
    effectFn();
  }
  return effectFn;
}

function track(obj, key) {
  if (!activeEffect) return;

  let depsMap = effectsMap.get(obj);
  if (!depsMap) {
    effectsMap.set(obj, (depsMap = new Map()));
  }

  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }

  dep.add(activeEffect);

  activeEffect.deps.push(dep);
}

function trigger(obj, key) {
  let depsMap = effectsMap.get(obj);
  if (!depsMap) return;

  let dep = depsMap.get(key);
  if (dep) {
    const effectToRun = new Set(dep);
    effectToRun.forEach((fn) => {
      if (activeEffect !== fn) {
        if (fn.options.scheduler) {
          fn.options.scheduler(fn);
        } else {
          fn();
        }
      }
    });
  }
}

function cleanup(effect) {
  for (let i = 0; i < effect.deps.length; i++) {
    effect.deps[i].delete(effect);
  }

  effect.deps.length = 0;
}

function computed(fn) {
  let dirty = true;
  let value;

  const effectFn = effect(fn, {
    lazy: true,
    scheduler() {
      if (!dirty) {
        dirty = true;
        trigger(obj, "value");
      }
    },
  });

  const obj = {
    get value() {
      if (dirty) {
        dirty = false;
        value = effectFn();
        track(obj, "value");
      }
      return value;
    },
  };

  return obj;
}

/** ------------ demo ------------ */
const obj = reactive({
  foo: "foo",
  foo2: "foo2",
});

// effect(() => {
//   console.log(obj.foo);

//   effect(() => {
//     console.log(obj.foo2);
//   });
// });
// effect(() => {
//   const txt = obj.foo ? obj.foo2 : "static";
//   console.log(txt);
// });

// obj.foo = null;
// obj.foo2 = "update foo2";

const computedData = computed(() => {
  console.log("computed ", obj.foo);
  return obj.foo;
});

effect(() => {
  console.log("effect trigger ", computedData.value);
});

computedData.value;
computedData.value;

obj.foo = "changed foo";
obj.foo = "changed foo2";
computedData.value;

/**
 * 引入 scheduler 任务调度的概念
 * 在不改变之前代码的情况下，实现在一个tick内多次触发相同的effectFn，只执行最后一次的功能
 * 原理：
 * 1. 利用 Set 中数据不会重复的特点，利用队列储存 effectFn
 *    const jobQueue = new Set()
 * 2. Promise
 *
 * 假设 obj.num 初始值为0
 * effect(() => {
 *    console.log(obj.num)
 * })
 * obj.num ++
 *
 * console.log('你好啊')
 *
 * 上述代码的打印顺序为
 * 0
 * 1
 * 你好啊
 *
 * effectFn 的调用顺序是同步的，如果我们希望打印顺序为
 * 0
 * 你好啊
 * 1
 * 则需要对 effectFn 的调用时机进行调整（异步调用）
 *
 *
 * 并且我们希望两次连续调用时，只会触发一次 effectFn，避免性能的浪费，举个现实点的例子就是，render 函数其实
 * 也是一个 effectFn，比如下面的🌰
 * function render() {
 *    return {
 *      tag: "p",
 *      children: obj.text
 *    }
 * }
 * effect(() => {
 *    render()
 * })
 *
 * obj 是个响应式对象，当 obj.text 多次变化的时候，我们希望 render 函数只进行最后一次计算，从而提升性能
 *
 * 引入调度 scheduler 的概念
 *
 */
let effectsMap = new WeakMap();
let activeEffect;
const effectStack = [];

function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn);

    activeEffect = effectFn;
    effectStack.push(activeEffect);

    fn();

    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
  };

  effectFn.deps = [];
  // 新增
  effectFn.options = options;
  effectFn();
  return effectFn;
}

const obj = {
  num: 0,
  num2: 0,
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

  if (deps) {
    const effectsToRun = new Set(deps);
    effectsToRun.forEach((effectFn) => {
      if (activeEffect !== effectFn) {
        // 新增 scheduler
        if (effectFn.options.scheduler) {
          effectFn.options.scheduler(effectFn);
        } else {
          // 默认同步执行
          effectFn();
        }
      }
    });
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

/** -------------- demo1 -------------- */
// effect(
//   () => {
//     console.log(proxy.num);
//   },
//   {
//     scheduler(effectFn) {
//       setTimeout(effectFn);
//     },
//   }
// );
// proxy.num++;

// console.log("你好啊");

/** -------------- demo2 -------------- */
const jobQueue = new Set();
const p = Promise.resolve();

let isFlushing = false;
function flushJob() {
  if (isFlushing) return;

  isFlushing = true;
  p.then(() => {
    jobQueue.forEach((job) => job());
  }).finally(() => {
    isFlushing = false;
  });
}

effect(
  () => {
    console.log("num2 ", proxy.num2);
  },
  {
    scheduler(effectFn) {
      // 同步添加到队列
      jobQueue.add(effectFn);
      flushJob();
    },
  }
);

proxy.num2++;
proxy.num2++;

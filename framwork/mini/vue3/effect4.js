/**
 * effect 嵌套
 *
 * 嵌套执行是很常见的，比如 render 函数，render 函数也是一个 effectFn，由于 VNode 构建的是树型结构，
 * 当父组件中包含子组件时，一定会出现嵌套调用的关系
 *
 * render 的嵌套例子：父组件 Foo，子组件 Bar
 * effect(() => {
 *    Foo.render()
 *    effect(() => {
 *      Bar.render()
 *    })
 * })
 *
 * 可以写个 demo 来试一下：
 * obj: {
 *   foo: 'foo',
 *   bar: 'bar'
 * }
 * let temp1, temp2
 * effect(function effectFn1() {
 *    console.log("effectFn1 执行")
 *
 *    effect(function effectFn2() {
 *        console.log("effectFn2 执行")
 *        temp1 = obj.bar
 *    })
 *
 *    temp2 = obj.foo
 * })
 *
 * obj.foo = 'foo update'
 *
 * 分析：
 * effectFn1 内嵌套了 effectFn2，effectFn1 执行时，很明显 effectFn2 也会执行
 * 但是反过来，如果 effectFn2 执行了，并不会让 effectFn1 执行
 * 此时的依赖关系：
 * |- obj
 *  |- foo
 *    |- effectFn1
 *  |- bar
 *    |- effectFn2
 *
 * 修改 obj.foo 的值时，会先执行 effectFn1，然后由于嵌套关系，会再执行 effectFn2
 * 我们预期的：
 * effectFn1 执行
 * effectFn2 执行  (上面两句是初始化的时候执行的，下面是trigger触发执行的打印)
 * effectFn1 执行
 * effectFn2 执行
 *
 * 但是实际上按照 effect3 中的代码跑起来的执行结果是这样的：
 * effectFn1 执行
 * effectFn2 执行  (上面两句是初始化的时候执行的，下面是trigger触发执行的打印)
 * effectFn2 执行
 *
 * 分析：
 * 每次 effectFn 调用时会更新 activeEffect
 * 但是由于嵌套的存在，effectFn2 执行时会使 activeEffect = effectFn2
 *
 * effect(function effectFn1() {
 *   console.log("effectFn1 执行")   // activeEffect -> effectFn1
 *
 *   effect(function effectFn2() {
 *       console.log("effectFn2 执行")  // activeEffect -> effectFn2
 *       temp1 = obj.bar
 *   })
 *
 *   temp2 = obj.foo      // 问题所在👉 activeEffect -> effectFn2，此时 foo 字段收集的是 effectFn2
 * })
 *
 * 最终依赖是这样的
 * |- obj
 *  |- foo
 *    |- effectFn2  ❌ 这里和预期不一致
 *  |- bar
 *    |- effectFn2
 *
 * 解决方法：
 * 用栈(effectStack)来按执行顺序保留 activeEffect，当函数执行完后就出栈，保证 activeEffect 的正确性
 *
 */
let effectsMap = new WeakMap();
let activeEffect;

// 新增
const effectStack = [];

function effect(fn) {
  const effectFn = () => {
    cleanup(effectFn);
    activeEffect = effectFn;
    // 新增 入栈
    effectStack.push(activeEffect);
    fn();
    // 执行完就出栈
    effectStack.pop();
    // 恢复 activeEffect
    activeEffect = effectStack[effectStack.length - 1];
  };

  effectFn.deps = [];
  effectFn();
  return effectFn;
}

const obj = {
  foo: "foo",
  bar: "bar",
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
let temp1, temp2;
effect(function effectFn1() {
  console.log("effectFn1 执行");

  effect(function effectFn2() {
    console.log("effectFn2 执行");
    temp1 = proxy.bar;
  });

  temp2 = proxy.foo;
});

proxy.foo = "foo update";

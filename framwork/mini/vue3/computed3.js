/**
 * 嵌套处理
 *
 * 情景：
 * data: {
 *    foo: "foo",
 *    bar: "bar"
 * }
 * const computedData = computed(() => {
 *    return data.foo + data.bar;
 * })
 *
 * effect(function effectFn() {
 *    console.log(computedData.value)
 * })
 *
 * data.foo = "foo2"
 *
 * 这个情景是必然会发生的，因为 render 函数本身就是 effectFn，在 render 函数内使用 computed 声明的对象
 * 就会产生嵌套关系
 *
 * 期待的结果：
 * data.foo 的改变应该要触发 effectFn 的执行，所以我们期待的打印结果应当为
 * foobar  (effectFn 初始化时的第一次打印)
 * foo2bar  (data.foo 的改变要引起 effectFn 的重新执行)
 *
 * but！！实际在 computed2.js 下运行的结果为：
 * foobar
 *
 * data.foo 的修改并没有触发 effectFn 的执行
 *
 * TODO 下面的文字逻辑待修改
 * 原因：
 * |- data
 *  |- foo
 *    |- computedEffect
 * 从依赖关系中看出，data.foo 的依赖只有 computedEffect，并不存在 effectFn
 * 而 computedEffect 触发时 仅仅只是改变了 dirty 变量，没有收集上层依赖的操作
 *
 * 解决：
 * 手动 track & trigger
 * |- data
 *  |- foo
 *    |- computedEffect
 *    |- effectFn
 */
const { effect, track, trigger } = require("./effect.js");
const { reactive } = require("./reactive.js");

function computed(fn) {
  let value;
  let dirty = true;

  const effectFn = effect(fn, {
    lazy: true,
    scheduler() {
      if (!dirty) {
        dirty = true;
        // 触发 obj.value 的依赖
        trigger(obj, "value");
      }
    },
  });

  const obj = {
    get value() {
      if (dirty) {
        dirty = false;
        value = effectFn();
        // 添加依赖关系
        track(obj, "value");
      }
      return value;
    },
  };

  return obj;
}

/** --------------- demo --------------- */
const data = reactive({
  foo: "foo",
  bar: "bar",
});

const computedData = computed(() => {
  return data.foo + data.bar;
});

effect(function effectFn() {
  console.log(computedData.value);
});

data.foo = "foo2";

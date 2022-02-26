/**
 * dirty
 *
 * computed 的数据缓存
 *
 * const computedStr = computed(() => {
 *   const str = data.foo + data.bar;
 *   console.log(str);
 *   return str;
 * });
 *
 * computedStr.value;
 * computedStr.value;
 *
 */
const { effect } = require("./effect.js");
const { reactive } = require("./reactive.js");

function computed(fn) {
  // 在闭包中储存当前的值
  let value;
  // 脏数据标志
  let dirty = true;

  const effectFn = effect(fn, {
    lazy: true,
    // 当 effectFn 被作为依赖触发的时候，让 dirty 为 true
    // 这样下次再调用的时候就可以获取新的数据
    scheduler() {
      dirty = true;
    },
  });

  const obj = {
    get value() {
      if (dirty) {
        // 计算之后让 dirty 为 false
        dirty = false;
        value = effectFn();
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

const computedStr = computed(() => {
  const str = data.foo + data.bar;
  console.log(str);
  return str;
});

computedStr.value;
computedStr.value;

// dirty = true 了
data.foo = "foo2";

computedStr.value;

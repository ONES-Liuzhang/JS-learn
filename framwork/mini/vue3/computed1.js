/**
 * computed & lazy
 *
 * 计算属性是在 Vue2 中就有的概念，实际上它只是个特殊的 effect
 *
 * effect 在默认情况下，初始化时会直接调用 effectFn 进行计算来收集依赖
 * 而 computed 不希望在初始化时就计算值，而是希望在调用的时候才计算
 *
 */
const { effect } = require("./effect.js");
const { reactive } = require("./reactive.js");

function computed(fn) {
  const effectFn = effect(fn, {
    lazy: true,
  });

  const obj = {
    get value() {
      return effectFn();
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

data.foo = "foo2";

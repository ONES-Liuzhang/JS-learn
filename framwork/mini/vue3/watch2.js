/**
 * watch 函数
 *
 * 回调函数拿到旧值与新值
 *
 * 可以巧妙利用 lazy 属性
 */
const { reactive } = require("./reactive.js");
const { effect } = require("./effect.js");

function watch(objOrFn, cb) {
  let getter;
  if (typeof objOrFn === "function") {
    getter = objOrFn;
  } else {
    getter = () => traverse(objOrFn);
  }

  let oldValue, newValue;
  const effectFn = effect(getter, {
    // 添加 lazy
    lazy: true,
    scheduler(effectFn) {
      // 之后触发的都是 scheduler 函数，effectFn 是被包裹的 getter
      newValue = effectFn();
      cb(newValue, oldValue);
      oldValue = newValue;
    },
  });

  // 手动触发第一次执行
  oldValue = effectFn();
}

function traverse(obj, seen = new Set()) {
  if (obj === null || typeof obj !== "object" || seen.has(obj)) return;

  seen.add(obj);

  for (let k in obj) {
    traverse(obj[k], seen);
  }

  return obj;
}

/** ------------- demo ------------- */
const obj = reactive({
  foo: "foo",
});

watch(
  () => obj.foo,
  (newVal, oldVal) => {
    console.log("obj改变了", oldVal, " -> ", newVal);
  }
);

obj.foo = "change foo";
obj.foo = "change foo2";

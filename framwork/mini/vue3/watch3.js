/**
 * watch 的立即执行 immediate
 *
 */
const { reactive } = require("./reactive.js");
const { effect } = require("./effect.js");

function watch(objOrFn, cb, options = {}) {
  let getter;
  if (typeof objOrFn === "function") {
    getter = objOrFn;
  } else {
    getter = () => traverse(objOrFn);
  }

  let oldValue, newValue;
  // 把 scheduler 提取出来
  const job = () => {
    newValue = effectFn();
    cb(newValue, oldValue);
    oldValue = newValue;
  };

  const effectFn = effect(getter, {
    lazy: true,
    scheduler: job,
  });

  if (options.immediate) {
    job();
  } else {
    oldValue = effectFn();
  }
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
  },
  {
    immediate: true,
  }
);

obj.foo = "change foo";
obj.foo = "change foo2";

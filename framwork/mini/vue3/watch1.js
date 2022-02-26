/**
 * watch 函数
 *
 * 利用 scheduler，effect 第一次触发的是 getter，之后触发的都是 scheduler 了
 *
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

  effect(getter, {
    scheduler() {
      cb();
    },
  });
}

// 递归读取 obj 的每个 key
function traverse(obj, seen = new Set()) {
  if (obj === null || typeof obj !== "object" || seen.has(obj)) return;

  seen.add(obj);

  // 暂时只考虑 obj 是个对象，数组的情况后面再完善
  for (let k in obj) {
    traverse(obj[k], seen);
  }

  return obj;
}

/** ------------- demo ------------- */
const obj = reactive({
  foo: "foo",
});

watch(obj, () => {
  console.log("obj改变了");
});

obj.foo = "change foo";

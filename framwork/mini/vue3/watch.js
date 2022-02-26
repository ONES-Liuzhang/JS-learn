const { reactive } = require("./reactive.js");
const { effect } = require("./effect.js");

function watch(objOrFn, cb, options = {}) {
  let getter;
  if (typeof objOrFn === "function") {
    getter = objOrFn;
  } else {
    getter = () => traverse(objOrFn);
  }

  let cleanup;
  // 过期函数
  const onInvalidate = (fn) => {
    cleanup = fn;
  };

  let oldValue, newValue;
  // 把 scheduler 提取出来
  const job = () => {
    newValue = effectFn();

    // 在调用 cb 之前先调用过期函数
    if (cleanup) {
      cleanup();
    }

    // 把 onInvalidate 传给 cb ，交给调用者处理
    cb(newValue, oldValue, onInvalidate);
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

module.exports = {
  watch,
};

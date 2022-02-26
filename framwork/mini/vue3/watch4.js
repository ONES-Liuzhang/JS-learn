/**
 * 竞态问题
 *
 * 模拟请求，传入的值是请求执行时间
 * function fetch(delay) {
 *  return new Promise((resolve) => {
 *    setTimeout(() => {
 *        resolve(delay);
 *      }, delay);
 *    });
 *  }
 *
 * obj.foo 改变的时候发起请求
 *
 * watch(
 *  () => obj.delay,
 *  async (val) => {
 *    const res = await fetch(val);
 *    finalData = res;
 *    console.log(finalData);
 *  }
 *);
 *
 * obj.delay = 1000;
 * obj.delay = 500;
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

/** ------------- demo ------------- */
const obj = reactive({
  delay: 0,
});

function fetch(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });
}

let finalData;

// obj.foo 改变的时候发起请求
watch(
  () => obj.delay,
  async (val, _, onInvalidate) => {
    let expired = false;
    onInvalidate(() => {
      expired = true;
    });

    const res = await fetch(val);

    if (!expired) {
      finalData = res;
      console.log(finalData);
    }
  }
);

// 同时发起两次请求，按道理第一次请求应该被废弃，第二次请求才是我们需要的结果
// 但是由于第一个请求返回的比较慢，导致 第一次请求 覆盖了 第二次请求
obj.delay = 1000;

obj.delay = 500;

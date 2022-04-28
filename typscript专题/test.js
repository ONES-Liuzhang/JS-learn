/**
 * 节流
 * @param {*} fn
 * @param {*} duration
 * @returns
 */
function throttle(fn, duration) {
  let timer = null;
  let start;

  const throttledFn = function throttledFn(...args) {
    const currTime = Date.now();
    // 第一次立即执行
    if (!start) {
      start = currTime;
      fn.apply(fn, args);
      return;
    }
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    const restTime = duration - (currTime - start);

    if (restTime <= 0) {
      start = currTime;
      fn.apply(fn, args);
    } else {
      timer = setTimeout(() => {
        fn.apply(fn, args);
        start = Date.now();
        timer = null;
      }, restTime);
    }
  };

  return throttledFn;
}

let count = 0;
function onScroll() {
  count++;
  console.log(count);
}

const throttledScroll = throttle(onScroll);

throttledScroll();
throttledScroll();
throttledScroll();
throttledScroll();
throttledScroll();

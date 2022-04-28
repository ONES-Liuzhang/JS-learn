function throttle<T extends Function>(fn: T, duration: number = 500): T {
  let timer = null;
  let start;

  const throttledFn: Function = function throttledFn(...args) {
    const currTime = Date.now();
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    if (!start || currTime - start >= duration) {
      start = currTime;
      fn.apply(fn, args);
    } else {
      timer = setTimeout(() => {
        fn.apply(fn, args);
        start = Date.now();
        timer = null;
      }, duration - currTime + start);
    }
  };

  return throttledFn as T;
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

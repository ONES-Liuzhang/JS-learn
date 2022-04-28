/**
 * 防抖 多次点击 只触发一次
 * @param fn
 * @param duration
 * @returns
 */
function debounce<T extends Function>(fn: T, duration: number = 200): T {
  let timer;

  const debouncedFn: unknown = function debouncedFn(...args) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      fn.apply(fn, args);
    }, duration);
  };

  return debouncedFn as T;
}

function onClick(str: string, num: number) {
  console.log(str, num);
}

const debouncedClick = debounce(onClick);

debouncedClick("aaa", 22);

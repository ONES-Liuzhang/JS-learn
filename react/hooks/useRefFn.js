import { useCallback, useRef } from "react";

/**
 * 返回一个恒定的函数引用，函数调用时执行新的函数
 *
 * @param {*} fn
 * @returns
 */
export default function useRefFn(fn) {
  const funcRef = useRef();
  funcRef.current = fn;

  const cacheFn = useCallback((...args) => {
    return funcRef.current.apply(null, args);
  }, []);

  return cacheFn;
}

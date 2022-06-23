/** 惰性单例 */
function lazySingle(fn) {
  let instance = null;

  return function() {
    return instance ? instance : fn.apply(fn, arguments)
  }
}
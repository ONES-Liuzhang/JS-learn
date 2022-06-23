// 缓存代理
function calc(...args) {
  let result = 0
  for(let i=0;i<args.length;i++) {
    result += args[i]
  }
  return result
}

// 通用缓存代理
function cacheProxy(fn) {
  const cache = {}
  return function(...args) {
    const argsStr = args.join(",")
    return cache[argsStr] ? cache[argsStr] : cache[argsStr] = fn.apply(fn, args)
  }
}
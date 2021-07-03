let cache = new Map();

// 缓存请求
function promiseCache(target, name, descriptor) {
  let val = descriptor.value;

  descriptor.value = function (...args) {
    let cacheKey = name + JSON.stringify(args);

    if (!cache.get(cacheKey)) {
      cache.set(
        cacheKey,
        Promise.resolve(val.apply(this, args)).catch((_) => {
          cache.set(cacheKey, null);
        })
      );
    }
    return cache.get(cacheKey);
  };
}

// 计算函数执行事件
function mesure(target, value, descriptor) {
  descriptor.value = function (...args) {};
}

class RequestClass {
  @promiseCache
  callFunc(url, params) {
    return new Promise((resolve, reject) => {
      console.log(url, " 请求发送！params:", params);
      setTimeout(() => {
        console.log(url, " 请求结束！");
        resolve(url);
      }, 1000);
    });
  }
}

let req = new RequestClass();

req.callFunc("aaa", { a: 1 });
req.callFunc("aaa", { a: 1 });
req.callFunc("aaa", { a: 1 });
req.callFunc("aaa", { a: 1 });

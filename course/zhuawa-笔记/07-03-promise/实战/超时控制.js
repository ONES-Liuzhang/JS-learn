// 1. fetch 请求超时

/** 函数超时 */
function asyncWithTimeout(fn, timeout) {
  return new Promise((resolve, reject) => {
    Promise.resolve(fn).then(resolve).catch(reject);
    setTimeout(() => reject("请求超时！"), timeout);
  });
}

/** 函数超时 使用Promise.race */
function asyncWithTimeout2(fn, timeout) {
  const promises = [Promise.resolve(fn), sleep(timeout)];
  return Promise.race(promises);
}

/** 函数超时 手动race */
function asyncWithTimeout3(fn, timeout) {
  return new Promise((resolve, reject) => {
    const promises = [Promise.resolve(fn), sleep(timeout)];
    for (let p of promises) {
      p.then(resolve).catch(reject);
    }
  });
}

function sleep(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject("请求超时"), duration);
  });
}

/** 模拟请求 */
function createRequest(timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("请求成功！");
    }, timeout);
  });
}

// 2. 抽奖转盘，请求获取到的时候，动画不一定结束 可以使用 Promise.all()
/** 抽奖转盘 - Promise.all */
function turntablePrimise(requestFn, animationduration) {
  const sleep = new Promise((resolve) => {
    setTimeout(resolve, animationduration);
  });
  return Promise.all([Promise.resolve(requestFn), sleep]);
}

// 动画时间2s，请求时间1s
let time = Date.now();
turntablePrimise(createRequest(1000), 2000).then((res) => {
  console.log(`转盘动画结束：${Date.now() - time}`);
});

turntablePrimise(createRequest(3000), 2000).then((res) => {
  console.log(`转盘动画结束：${Date.now() - time}`);
});

// 3. 带超时效果的抽奖转盘， 结合上面的超时代码一起食用 如果超出了超时时间，直接reject
function turntableWithTimeout(requestFn, timeout, animationduration) {
  if (timeout < animationduration) {
    return Promise.reject("turntableWithTimeout 函数传参错误！");
  }
  const sleep = new Promise((resolve) => {
    setTimeout(resolve, animationduration);
  });
  const realRequest = asyncWithTimeout(requestFn, timeout);
  return Promise.all([realRequest, sleep]);
}

turntableWithTimeout(createRequest(1000), 500, 1000).then((res) => {
  console.log(`转盘动画结束：${Date.now() - time}`);
});

turntableWithTimeout(createRequest(1000), 2000, 1000).then((res) => {
  console.log(`转盘动画结束：${Date.now() - time}`);
});

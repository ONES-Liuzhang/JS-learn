// 封装一个工具函数处理异步函数的超时
function asyncWithTimeout(asyncFn, wait) {
  return function () {
    let timer;
    return new Promise((resolve, reject) => {
      Promise.resolve(asyncFn.apply(null, arguments)).then(
        (res) => {
          clearTimer(timer);
          resolve(res);
        },
        (reason) => {
          clearTimer(timer);
          reject(reason);
        }
      );

      timer = setTimeout(() => {
        reject("函数执行超时！");
      }, wait);
    });
  };
  function clearTimer(timer) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
}

function asyncFn(name) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(name);
    }, 3000);
  });
}

const newFn = asyncWithTimeout(asyncFn, 1000);

newFn("asyncFn")
  .then((name) => {
    console.log(`函数${name}执行完毕`);
  })
  .catch((e) => {
    console.log(e);
  });

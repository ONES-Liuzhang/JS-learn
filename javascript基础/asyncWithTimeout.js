// 封装一个工具函数，处理对异步函数的超时处理
// TODO reject后需要中断原异步函数的执行吗，可以中止吗？
function asyncWithTimeout(asyncFn, timeout) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      let p = asyncFn.apply(asyncFn, args);
      p.then(resolve).catch(reject);
      setTimeout(() => {
        reject("异步函数超时！");
      }, timeout);
    });
  };
}

function asyncFn() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1500);
  });
}

const newFn = asyncWithTimeout(asyncFn, 200);

newFn()
  .then((res) => console.log("resolve"))
  .catch((err) => console.error(err));

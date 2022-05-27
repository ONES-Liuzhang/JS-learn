// 背景： 多次点击一个搜索button发送了多次请求
// 1. 可以通过防抖处理，减少请求次数 - 无法解决多次请求返回顺序不一致的问题
// 2. 需要对重复请求进行中止 - xhr.abort() , fetch 中可以使用 AbortController
process.on("unhandledRejection", (err) => console.log(err));

const { EventEmitter } = require("eventemitter3");

// 3. 封装一个可以取消请求的Promise
class CancelablePromise {
  constructor() {
    this.penddingPromise = null;
  }

  request(fn) {
    // 处理重复请求，发送下一个请求的时候 取消前一个请求
    if (this.penddingPromise) {
      this.abort();
    }
    const _promise = new Promise((resolve, reject) => (this._reject = reject));
    this.penddingPromise = Promise.race([Promise.resolve(fn), _promise]);
    return this.penddingPromise;
  }

  abort() {
    this._reject("请求中止！");
    this.penddingPromise = null;
  }
}

// 工具函数
function createRequest(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("请求完成"), duration);
  });
}

// 测试
// const requestFn = createRequest(1000);
// const cancelable = new CancelablePromise();

// cancelable.request(requestFn).then((res) => {
//   console.log(res);
// });
// setTimeout(() => {
//   cancelable.abort();
// }, 1500);

// 应用： 发送多个重复请求时，手动取消之前的请求， 模拟按钮点击事件
const eventEmitter = new EventEmitter();
const cancelable = new CancelablePromise();
const requestFn = createRequest(1000); // 请求返回时间 1s

const handleClick = function () {
  cancelable.request(requestFn).then((res) => {
    console.log(res);
  });
};
eventEmitter.on("click", handleClick);

eventEmitter.emit("click");
eventEmitter.emit("click");
eventEmitter.emit("click");

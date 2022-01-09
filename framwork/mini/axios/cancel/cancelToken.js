import Cancel from "./cancel";
/**
 * CancelToken
 *
 * token 实例
 *
 *
 * TODO: 这是什么模式？
 */
export default function CancelToken(excutor) {
  let resolvePromise;
  this.promise = new Promise(function promiseExcutor(resolve) {
    resolvePromise = resolve;
  });

  this.resolve = resolvePromise;

  const token = this;
  excutor(function cancel(message) {
    if (token.reason) {
      // 请求已经被中断了
      return;
    }
    token.reason = new Cancel(message);
    token.resolve(token.reason);
  });
}

CancelToken.source = function source() {
  let cancel;
  const token = new CancelToken(function excutor(c) {
    cancel = c;
  });

  return {
    token,
    cancel,
  };
};

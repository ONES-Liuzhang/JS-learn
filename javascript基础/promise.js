const PromiseState = {
  PENDING: "pending",
  REJECTED: "rejected",
  FULFILLED: "fulfilled",
};

class MyPromise {
  FULFILLED_CALLBACK_LIST = [];
  REJECTED_CALLBACK_LIST = [];

  _state = PromiseState.PENDING;

  value = null;
  reason = null;

  constructor(fn) {
    const resolve = this.resolve.bind(this);
    const reject = this.reject.bind(this);

    fn(resolve, reject);
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;
    switch (state) {
      case PromiseState.FULFILLED:
        this.FULFILLED_CALLBACK_LIST.forEach((cb) => {
          cb(this.value);
        });
        break;
      case PromiseState.REJECTED:
        this.REJECTED_CALLBACK_LIST.forEach((cb) => {
          cb(this.reason);
        });
        break;
    }
  }

  then(onFulfilled, onRejected) {
    const realOnFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;

    const realOnRejected =
      typeof onRejected === "function" ? onRejected : (value) => value;

    const promise2 = new MyPromise((resolve, reject) => {
      const fulFillMicrotask = () =>
        queueMicrotask(() => {
          try {
            const x = realOnFulfilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });

      const rejectMicrotask = () =>
        queueMicrotask(() => {
          try {
            const x = realOnRejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });

      switch (this.state) {
        case PromiseState.PENDING:
          this.FULFILLED_CALLBACK_LIST.push(fulFillMicrotask);
          this.REJECTED_CALLBACK_LIST.push(rejectMicrotask);
          break;
        case PromiseState.REJECTED:
          rejectMicrotask();
          break;
        case PromiseState.FULFILLED:
          fulFillMicrotask();
          break;
      }
    });

    return promise2;
  }

  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(new TypeError("循环调用！"));
    }

    if (x instanceof MyPromise) {
      x.then(resolve, reject);
    } else if (isPromiseLike(x)) {
      let then;

      // 7.3 x = x.then -> 如果报错 直接 reject promise with e as the reason.
      try {
        then = x.then;
      } catch (err) {
        reject(err);
      }

      let called = false;
      try {
        then.call(
          x,
          (y) => {
            if (!called) {
              called = true;
              this.resolvePromise(promise2, y, resolve, reject);
            }
          },
          (r) => {
            if (!called) {
              called = true;
              reject(r);
            }
          }
        );
      } catch (err) {
        reject(err);
      }
    } else {
      resolve(x);
    }
  }

  resolve(value) {
    if (this.state === PromiseState.PENDING) {
      this.value = value;
      this.state = PromiseState.FULFILLED;
    }
  }

  reject(reason) {
    if (this.state === PromiseState.PENDING) {
      this.reason = reason;
      this.state = PromiseState.REJECTED;
    }
  }
}

function isPromiseLike(promise) {
  return (
    promise &&
    (typeof promise === "object" || typeof promise === "function") &&
    promise.then &&
    typeof promise.then === "function"
  );
}

/**
 * 1. Main JS 执行
 * 2. 遇到 setTimeout1 加入计时器队列
 * 3. 遇到 setTimeout2 加入计时器队列
 * 4. 1s后 setTimeout1 加入宏任务队列，setTimeout2加入宏任务队列
 * 5. 宏任务 取出 setTimeout1 执行
 * 6. resolve -> then callback -> 加入微任务队列
 * 7. setTimeout1 执行结束
 * 8. 微任务队列 取出 then callback
 * 9. 宏任务 取出 setTimeout2 执行
 */
const test = new MyPromise((resolve) => {
  setTimeout(() => resolve(111), 1000);
}).then((res) => console.log("case4-1", test));

setTimeout(() => console.log("case4-2", test), 1000);

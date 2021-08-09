enum PromiseStatus {
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

interface FulfilledCallback<T> {
  (val: T): IPromiseConstructor<any>;
}

interface RejectedCallback<T> {
  (reason?: any): IPromiseConstructor<T>;
}

interface IPromiseLike<T> {
  then<TResult1 = T, TResult2 = never>(
    onFulfilled:
      | ((val: T) => TResult1 | IPromiseLike<TResult1>)
      | null
      | undefined,
    onRejected:
      | ((reason?: any) => TResult2 | IPromiseLike<TResult2>)
      | null
      | undefined
  ): IPromiseLike<TResult1 | TResult2>;
}

interface IPromise<T> {
  value: T;
  reason: any;
  status: PromiseStatus;
  then<TResult1 = T, TResult2 = never>(
    onFulfilled:
      | ((val: T) => TResult1 | IPromiseLike<TResult1>)
      | null
      | undefined,
    onRejected:
      | ((reason?: any) => TResult2 | IPromiseLike<TResult2>)
      | null
      | undefined
  ): IPromiseLike<TResult1 | TResult2>;
  catch<TResult>(onRejected: (reason?: any) => TResult | IPromiseLike<TResult>);
}

interface IPromiseConstructor<T> {
  new <T>(
    excutor: (resolve: (val: T) => void, reject: (reason?: any) => void) => void
  ): IPromise<T>;
}

// 使用getter和setter进行状态管理
class MPromise<T> {
  FULFILLED_CALLBACK_LIST = [];
  REJECTED_CALLBACK_LIST = [];
  _status: PromiseStatus = PromiseStatus.PENDING;

  value: T;
  reason: any;

  constructor(excutor) {
    this.status = PromiseStatus.PENDING;

    try {
      excutor(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  }

  get status(): PromiseStatus {
    return this._status;
  }

  set status(newStatus) {
    this._status = newStatus;
    switch (newStatus) {
      case PromiseStatus.FULFILLED:
        this.FULFILLED_CALLBACK_LIST.forEach((callback) => {
          callback(this.value);
        });
        break;
      case PromiseStatus.REJECTED:
        this.REJECTED_CALLBACK_LIST.forEach((callback) => {
          callback(this.value);
        });
        break;
    }
  }

  then(onFulfilled?: any, onRejected?: any) {
    // 判断onFulfilled和onRejected是否为函数，如果不是函数 进行值的透传
    const realOnFulfilled = isFunction(onFulfilled)
      ? onFulfilled
      : (value) => value;
    const realOnRejected = isFunction(onRejected)
      ? onRejected
      : (reason) => reason;

    let promise2 = new MPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnFulfilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };

      const rejecetdMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnRejected(this.value);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };

      // 状态判断
      switch (this.status) {
        case PromiseStatus.FULFILLED:
          fulfilledMicrotask();
          break;
        case PromiseStatus.REJECTED:
          rejecetdMicrotask();
          break;
        case PromiseStatus.PENDING:
          this.FULFILLED_CALLBACK_LIST.push(fulfilledMicrotask);
          this.REJECTED_CALLBACK_LIST.push(rejecetdMicrotask);
          break;
      }
    });
    return promise2;
  }

  // 接管promise2的行为，拆分逻辑
  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) throw TypeError("[ERROR] 循环引用！");

    if (x instanceof MPromise) {
      switch (x.status) {
        // 如果x是pending态，则promise2必须等待x
        case PromiseStatus.PENDING:
          x.then(resolve, reject);
          break;
        case PromiseStatus.FULFILLED:
          resolve(x.value);
          break;
        case PromiseStatus.REJECTED:
          reject(x.reason);
          break;
      }
    } else if (typeof x === "object" || typeof x === "function") {
      if (x == null) return resolve();

      let then = null;
      // 如果x是一个PromiseLike，不能确保它的then方法的具体实现，需要包一层resolvePromise
      try {
        then = x.then;
      } catch (e) {
        reject(e);
      }

      if (typeof then === "function") {
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
                return r;
              }
            }
          );
        } catch (e) {
          if (called) return;
          reject(e);
        }
      } else {
        resolve(x);
      }
    } else {
      resolve(x);
    }
  }

  resolve(val) {
    if (this.status === PromiseStatus.PENDING) {
      this.value = val;
      this.status = PromiseStatus.FULFILLED;
    }
  }

  reject(reason) {
    if (this.status === PromiseStatus.PENDING) {
      this.reason = reason;
      this.status = PromiseStatus.REJECTED;
    }
  }

  catch(e?: any) {
    return this.then(null, e);
  }

  public static race(promises: Array<MPromise<unknown>>) {
    return new MPromise((resolve, reject) => {
      promises.forEach((p) => {
        p.then(
          (res) => {
            resolve(res);
          },
          (e) => {
            reject(e);
          }
        );
      });
    });
  }

  public static resolve(val?: any) {
    return new MPromise((resolve) => {
      resolve(val);
    });
  }
}

function isFunction(val) {
  return typeof val === "function";
}

// let p = new MPromise((resolve) => {
//   setTimeout(() => {
//     resolve("111");
//   }, 1000);
// })
//   .then((res) => res)
//   .then((res) => {
//     console.log(res);
//     console.log(p);
//   })
//   .catch((e) => {});

// setTimeout(() => {
//   console.log(p);
// }, 3000);

const test = new MPromise((resolve) => {
  setTimeout(() => resolve(111), 1000);
}).then((res) => console.log("case4-1", test));

setTimeout(() => console.log("case4-2", test), 1000);

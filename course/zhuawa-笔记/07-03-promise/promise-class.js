const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class SelfPromise {
  FULFILLED_CALLBACK_LIST = [];
  REJECTED_CALLBACK_LIST = [];
  value;
  reason;
  _status = PENDING;

  constructor(excutor) {
    this.status = PENDING;

    try {
      excutor(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  }

  get status() {
    return this._status;
  }

  set status(newStatus) {
    this._status = newStatus;
    switch (newStatus) {
      case FULFILLED:
        this.FULFILLED_CALLBACK_LIST.forEach((callback) => {
          callback(this.value);
        });
        break;
      case REJECTED:
        this.REJECTED_CALLBACK_LIST.forEach((callback) => {
          callback(this.reason);
        });
        break;
    }
  }

  // pending -> resolve(value) -> fulfilled -> onFulfilled(value)
  resolve(value) {
    if (this.status === PENDING) {
      this.value = value;
      this.status = FULFILLED;
    }
  }

  reject(reason) {
    if (this.status === PENDING) {
      this.reason = reason;
      this.status = REJECTED;
    }
  }

  then(onFulfilled, onRejected) {
    let realOnFulfilled = isFunction(onFulfilled)
      ? onFulfilled
      : (value) => value;

    let realOnRejected = isFunction(onRejected)
      ? onRejected
      : (reason) => {
          throw reason;
        };

    let promise2 = new SelfPromise((resolve, reject) => {
      const fulfilledFn = () => {
        queueMicrotask(() => {
          try {
            let x = realOnFulfilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };

      const rejectedFn = () => {
        queueMicrotask(() => {
          try {
            let x = realOnRejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };

      switch (this.status) {
        case FULFILLED:
          fulfilledFn();
          break;
        case REJECTED:
          rejectedFn();
          break;
        case PENDING:
          this.FULFILLED_CALLBACK_LIST.push(fulfilledFn);
          this.REJECTED_CALLBACK_LIST.push(rejectedFn);
          break;
      }
    });

    return promise2;
  }

  /** promise2?????????resolve???reject??????
   *
   * @param {SelfPromise} promise2 ????????????promise
   * @param {any} x onFulfilled ?????? onRejected????????????
   * @param {*} resolve
   * @param {*} reject
   */
  resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      throw TypeError("????????????");
    }

    if (x instanceof SelfPromise) {
      // ??????????????????Promise?????????????????????????????????
      queueMicrotask(() => {
        x.then(resolve, reject);
      });
    } else if (typeof x === "object" || isFunction(x)) {
      if (x == null) return resolve();

      let then = null;
      // ?????????????????????
      try {
        then = x.then;
      } catch (e) {
        return reject(e);
      }

      if (isFunction(then)) {
        let called = false;
        try {
          then.call(
            x,
            // ?????????????????????
            // ????????????????????????PromiseLike??????????????????????????????????????????????????????resolvePromise???????????????????????????????????????promise2
            // ?????????????????????????????????????????????
            // ????????????then?????????????????????????????????????????? -> ???????????????????????????????????????onFulfilled ??? onRejected??????????????????
            (y) => {
              if (!called) {
                this.resolvePromise(promise2, y, resolve, reject);
              }
            },
            (e) => {
              if (!called) {
                reject(e);
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

  static race(promises) {
    return new SelfPromise((resolve, reject) => {
      promises.forEach((p) => {
        p.then(
          (res) => {
            resolve(res);
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  }

  static all(promises) {
    return new SelfPromise((resolve, reject) => {
      const result = [];
      let counter = 0;

      promises.forEach((p, index) => {
        SelfPromise.resolve(p).then(
          (value) => {
            counter++;
            result[index] = value;
            if (counter === promises.length) {
              resolve(result);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  }

  static resolve(value) {
    return new SelfPromise((resolve) => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new SelfPromise((_, reject) => {
      reject(reason);
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  // finally
  // 1. ??????Promise?????????rejected??????resolved????????????
  // 2. ?????????????????????????????????
  // 3. ????????????????????????promise???????????????????????????????????????????????????promise
}

function isFunction(value) {
  return typeof value === "function";
}

module.exports = SelfPromise;

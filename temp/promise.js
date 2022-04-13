const PROMISE_STATUS = {
  pending: "pending",
  fulfilled: "fulfilled",
  rejected: "rejected",
};

class MyPromise {
  FULFILLED_CALLBACKS = [];
  REJECTED_CALLBACKS = [];

  value = null;
  reason = null;

  _status = PROMISE_STATUS.pending;
  constructor(fn) {
    const resolve = this.resolve.bind(this);
    const reject = this.reject.bind(this);

    if (!fn) return this;

    try {
      fn(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  get status() {
    return this._status;
  }

  set status(s) {
    this._status = s;
    switch (s) {
      case "fuifilled":
        this.FULFILLED_CALLBACKS.forEach((fn) => fn(this.value));
        break;
      case "rejected":
        this.REJECTED_CALLBACKS.forEach((fn) => fn(this.reason));
        break;
    }
  }

  then(onFulfilled, onRejected) {
    const realOnFulfilled =
      typeof onFulfilled === "function"
        ? onFulfilled
        : (onFulfilled) => onFulfilled;

    const realOnRejected =
      typeof onRejected === "function"
        ? onRejected
        : (onRejected) => onRejected;

    const promise = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnFulfilled(this.value);
            this.resolvePromise(promise, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      };

      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnRejected(this.value);
            this.resolvePromise(promise, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      };

      this.FULFILLED_CALLBACKS.push(fulfilledMicrotask);
      this.REJECTED_CALLBACKS.push(rejectedMicrotask);
    });

    return promise;
  }

  resolvePromise(promise, x, resolve, reject) {
    if (!x) {
      resolve(x);
    }

    if (typeof x === "object") {
      if (typeof x.then === "function") {
      }
    }
  }

  resolve(val) {
    if (this.status === PROMISE_STATUS.pending) {
      this.status = PROMISE_STATUS.fulfilled;
      this.value = val;
    }
  }

  reject(reason) {
    if (this.status === PROMISE_STATUS.pending) {
      this.status = PROMISE_STATUS.rejected;
      this.reason = reason;
    }
  }
}

p = new MyPromise();

console.log(p.status);

// 报错处理基本原则：不能信任外部传入的callback，需要做try catch

let LAST_ERROR = null;
let IS_ERROR = {};

const PromiseState = {
    PENDDING: 1,
    RESOLVED_NORMAL: 1 << 1,
    RESOLVED_PROMISE: 1<<2,
    REJECTED: 1<<3,
}

PromiseState.RESOLVED = PromiseState.RESOLVED_PROMISE | PromiseState.RESOLVED_NORMAL

function tryCallOne(fn, a) {
  try {
    return fn(a);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

function tryCallTwo(fn, a, b) {
  try {
    return fn(a, b);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

let timer;
const noop = function () {};
function _promise(fn) {
  if (typeof this !== "object") {
    throw new TypeError("必须使用new操作符!");
  }
  if (typeof fn !== "function") {
    throw new TypeError("Promise的参数必须为一个函数!");
  }
  this._state = PromiseState.PENDDING;
  this._value = null;
  this._deferreds = null;
  if (fn === noop) return;
  doResolve(this, fn);
}

_promise.prototype.then = function (onFulfilled, onRejected) {
  const res = new _promise(noop);
  const deferred = (this._deferreds = this._deferreds || {})
  deferred.onFulfilled = onFulfilled
  deferred.onRejected = onRejected
  deferred.promise = res
  handle(self, deferred)
  return res
};

function handle(self, deferred) {
  while(self._state === PromiseState.RESOLVED_PROMISE) {
    self = self._value
  }
  if(self._state === PromiseState.PENDDING) {
    if(self._deferreds) {
      self._deferreds = [].concat(self._deferreds, deferred)
    } else {
      self._deferreds = deferred
    }
    return
  }  
  handleResolved(self, deferred)
}

// 向下传递
// resolve 的预处理过程
function resolve(self, newValue) {
  if (self === newValue) {
    // 死循环
    throw new Error("promise不能resolve自身！");
  }
  if (
    newValue &&
    (typeof newValue === "function" || typeof newValue === "object")
  ) {
    // promise
    if (newValue instanceof _promise) {
      self._value = newValue
      self._state = PromiseState.RESOLVED_PROMISE

      return;
    }
  }
  self._state = PromiseState.RESOLVED_NORMAL;
  self._value = newValue;
  let deferred = self._deferreds
  if(Array.isArray(deferred)) {
    deferred.forEach
  } else {
    handleResolved(self, self._deferreds);
  }
}

function reject(self) {
  console.log('报错拉')
}

// 真正的resolve
function handleResolved(self, deferred) {
  if(!deferred) return
  setTimeout(() => {
    let cb = self._state === PromiseState.RESOLVED_NORMAL ? deferred.onFulfilled : deferred.onRejected;

    // 如果promise对象没有调用then函数，cb === null
    if (!cb) {
      if (self._state === PromiseState.RESOLVED_NORMAL) {
        resolve(deferred.promise, self._value);
      } else {
        reject(deferred.promise, self);
      }
      return;
    }
    // 第一个onFulfilled中返回的值 作为下一个promise的resolve
    let x = cb(self._value);
    resolve(deferred.promise, x);
  });
}

function doResolve(promise, fn) {
  let done = false;
  // 防止resolve、reject被多次调用
  fn(
    function (val) {
      if (done) return;
      done = true;
      resolve(promise, val);
    },
    function (val) {
      if (done) return;
      done = true;
      reject(promise, val);
    }
  );
}

/**
 *
 * @param {*} onFulfilled 成功回调
 * @param {*} onRejected 失败回调
 * @param {*} res 下一次promise
 */
function Handler(onFulfilled, onRejected, res) {
  this.onFulfilled = typeof onFulfilled === "function" ? onFulfilled : null;
  this.onRejected = typeof onRejected === "function" ? onFulfilled : null;
  this.promise = res;
}

// test
timer = Date.now();
new _promise((resolve, reject) => {
  resolve(new _promise(resolve => resolve(3333)))
})
  .then((res) => {
    log(1, res);
    return 222;
  })


function log(...args) {
  console.log(`timer :${Date.now() - timer}`, ...args);
  timer = Date.now();
}

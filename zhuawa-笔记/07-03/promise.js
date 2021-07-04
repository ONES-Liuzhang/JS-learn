var PromiseStatus;
(function (PromiseStatus) {
    PromiseStatus["PENDING"] = "pending";
    PromiseStatus["FULFILLED"] = "fulfilled";
    PromiseStatus["REJECTED"] = "rejected";
})(PromiseStatus || (PromiseStatus = {}));
// 使用getter和setter进行状态管理
var MPromise = /** @class */ (function () {
    function MPromise(excutor) {
        this.FULFILLED_CALLBACK_LIST = [];
        this.REJECTED_CALLBACK_LIST = [];
        this._status = PromiseStatus.PENDING;
        this.status = PromiseStatus.PENDING;
        try {
            excutor(this.resolve.bind(this), this.reject.bind(this));
        }
        catch (e) {
            this.reject(e);
        }
    }
    Object.defineProperty(MPromise.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (newStatus) {
            var _this = this;
            this._status = newStatus;
            switch (newStatus) {
                case PromiseStatus.FULFILLED:
                    this.FULFILLED_CALLBACK_LIST.forEach(function (callback) {
                        callback(_this.value);
                    });
                    break;
                case PromiseStatus.REJECTED:
                    this.REJECTED_CALLBACK_LIST.forEach(function (callback) {
                        callback(_this.value);
                    });
                    break;
            }
        },
        enumerable: false,
        configurable: true
    });
    MPromise.prototype.then = function (onFulfilled, onRejected) {
        var _this = this;
        // 判断onFulfilled和onRejected是否为函数，如果不是函数 进行值的透传
        var realOnFulfilled = isFunction(onFulfilled)
            ? onFulfilled
            : function (value) { return value; };
        var realOnRejected = isFunction(onRejected)
            ? onRejected
            : function (reason) { return reason; };
        var promise2 = new MPromise(function (resolve, reject) {
            var fulfilledMicrotask = function () {
                queueMicrotask(function () {
                    try {
                        var x = realOnFulfilled(_this.value);
                        _this.resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            };
            var rejecetdMicrotask = function () {
                queueMicrotask(function () {
                    try {
                        var x = realOnRejected(_this.value);
                        _this.resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            };
            // 状态判断
            switch (_this.status) {
                case PromiseStatus.FULFILLED:
                    fulfilledMicrotask();
                    break;
                case PromiseStatus.REJECTED:
                    rejecetdMicrotask();
                    break;
                case PromiseStatus.PENDING:
                    _this.FULFILLED_CALLBACK_LIST.push(fulfilledMicrotask);
                    _this.REJECTED_CALLBACK_LIST.push(rejecetdMicrotask);
                    break;
            }
        });
        return promise2;
    };
    // 接管promise2的行为，拆分逻辑
    MPromise.prototype.resolvePromise = function (promise2, x, resolve, reject) {
        var _this = this;
        if (promise2 === x)
            throw TypeError("[ERROR] 循环引用！");
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
        }
        else if (typeof x === "object" || typeof x === "function") {
            if (x == null)
                return resolve();
            var then = null;
            // 如果x是一个PromiseLike，不能确保它的then方法的具体实现，需要包一层resolvePromise
            try {
                then = x.then;
            }
            catch (e) {
                reject(e);
            }
            if (typeof then === "function") {
                var called_1 = false;
                try {
                    then.call(x, function (y) {
                        if (!called_1) {
                            called_1 = true;
                            _this.resolvePromise(promise2, y, resolve, reject);
                        }
                    }, function (r) {
                        if (!called_1) {
                            called_1 = true;
                            return r;
                        }
                    });
                }
                catch (e) {
                    if (called_1)
                        return;
                    reject(e);
                }
            }
            else {
                resolve(x);
            }
        }
        else {
            resolve(x);
        }
    };
    MPromise.prototype.resolve = function (val) {
        if (this.status === PromiseStatus.PENDING) {
            this.value = val;
            this.status = PromiseStatus.FULFILLED;
        }
    };
    MPromise.prototype.reject = function (reason) {
        if (this.status === PromiseStatus.PENDING) {
            this.reason = reason;
            this.status = PromiseStatus.REJECTED;
        }
    };
    MPromise.prototype["catch"] = function (e) {
        return this.then(null, e);
    };
    MPromise.race = function (promises) {
        return new MPromise(function (resolve, reject) {
            promises.forEach(function (p) {
                p.then(function (res) {
                    resolve(res);
                }, function (e) {
                    reject(e);
                });
            });
        });
    };
    MPromise.resolve = function (val) {
        return new MPromise(function (resolve) {
            resolve(val);
        });
    };
    return MPromise;
}());
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
var test = new MPromise(function (resolve) {
    setTimeout(function () { return resolve(111); }, 1000);
}).then(function (res) { return console.log("case4-1", test); });
setTimeout(function () { return console.log("case4-2", test); }, 1000);

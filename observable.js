// 双向绑定原理
const _toString = Object.prototype.toString;
function observe(data) {
  if (
    _toString.call(data) === "[object Object]" ||
    _toString.call(data) === "[object Array]"
  ) {
    Object.keys(data).map((key) => {
      defineReactive(data, key, data[key]);
    });
  }
}

function defineReactive(data, key, val) {
  let deps = new Deps();
  observe(val);
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      if (Deps.target) {
        deps.addSub(Deps.target);
      }
      return val;
    },
    set: function (newVal) {
      val = newVal;
      // 触发wather变化
      deps.notify();
    },
  });
}

// 订阅器
function Deps() {
  this.deps = [];
}

Deps.prototype.notify = function () {
  // 接收到变化 通知所有Wather
  this.deps.map((wather) => {
    wather.update();
  });
};

Deps.prototype.addSub = function (wather) {
  this.deps.push(wather);
};

/**
 *
 * @param {*} vm Vue实例化对象
 * @param {*} exp data里的属性
 * @param {*} cb 回调
 */
function Watcher(vm, exp, cb) {
  this.vm = vm;
  this.exp = exp;
  this.cb = cb;
  this.val = this.get();
}

Watcher.prototype = {
  update() {
    let oldVal = this.val;
    let val = this.vm.data[this.exp];
    console.log(
      `this.vm.data.${this.exp} update :oldVal ${oldVal}, newVal ${val}`
    );
    this.cb.call(this.vm, val, oldVal);
  },
  get() {
    // 初始化的时候手动调用
    Deps.target = this;
    let val = this.vm.data[this.exp]; // 触发了this.vm.data的get方法
    Deps.target = null;
    return val;
  },
};

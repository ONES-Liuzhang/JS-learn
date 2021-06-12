// utils
function def(obj, key, value) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    writable: true,
  });
}

function isArray(obj) {
  return Array.isArray(obj);
}

function remove(arr, item) {}

function isObject(obj) {
  return obj !== null && typeof obj === "object";
}

// Dep 相当于观察者、发布信息
class Dep {
  constructor() {
    this.subs = [];
  }
}

// 添加双向依赖
Dep.prototype.depend = function () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.addSub = function (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function (sub) {
  remove(this.subs, sub);
};

// 发布通知
Dep.prototype.notify = function () {
  this.subs.forEach((sub) => {
    sub.run();
  });
};

Dep.target = null;

// Watcher 订阅
class Watcher {
  deps;
  // expOrFn 要触发的函数
  constructor(vm, expOrFn, cb, options) {
    this.deps = [];
    this.vm = vm; // vue实例
    const { deep } = options;
    this.deep = deep; // 是否为深度监听
    this.getter = expOrFn;

    this.value = this.get();
  }

  addDep(dep) {
    dep.addSub(this);
    this.deps.push(dep);
  }

  // 当watcher被初始化时，先调用一次expOrFn
  get() {
    // 在调用getter之前，先把当前的watcher添加到Dep.target
    Dep.target = this;
    let value = this.getter();
    // 依赖收集，触发getter
    this.getter.apply(vm, vm);
    // 调用结束，清空Dep.target
    Dep.target = null;
  }

  run() {
    this.getter.apply(vm);
  }
}

// 监听
function watch(vm, obj, fn) {}

// 计算属性
function computed(vm, name, fn) {}

class Observer {
  dep;
  value;
  constructor(value) {
    this.dep = new Dep();
    this.value = value;
    def(value, "__ob__", this);
    if (isArray(value)) {
    } else {
      this.walk(value);
    }
  }

  // 递归收集依赖
  walk(value) {
    const keys = Object.keys(this.value);
    for (var i = keys.length - 1; i >= 0; i--) {
      defineReactive(value, keys[i]);
    }
  }
}

/**
 * 数据劫持
 * @param  {[type]} obj [description]
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
function defineReactive(obj, key, deep) {
  const dep = new Dep();

  // TODO: 兼容obj本身的property  Object.getOwnDescriptor

  // 递归 childOb: Observerble
  let childOb = deep && observer(obj[val]);

  let value = obj[key];

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      // 收集依赖
      // TODO: Dep.target是一个Watcher 表示当前的Watcher
      // Dep.target何时赋值
      if (Dep.target) {
        dep.depend();
        // 同步改变childOb
        if (childOb) {
          childOb.dep.depend();
        }
      }
      // 这里不能写return obj[key]，会造成死循环
      return value;
    },
    set(val) {
      if (value === val) return;
      value = val;
      dep.notify();
    },
  });
}

function observer(obj) {
  // 如果不是对象 则不做任何操作
  let ob = new Observer(obj);
  return ob;
}

// Test
let vm = {
  data: {
    obj: {
      a: 1,
      b: 2,
    },
  },
  render() {
    console.log("render: 开始渲染");
    const obj = this.data.obj;
    console.log(obj.a);
  },
};

// 数据劫持
observer(vm.data.obj);

// 新增一个监听
new Watcher(
  vm,
  function () {
    vm.render();
  },
  null,
  {
    deep: true
  }
);

vm.data.obj.a = 4;


import Compiler from "./compiler.js";
import Observer from "./observer.js";
import Watcher from "./watcher.js";
import { isFunction, isPlainObject } from "../utils";

function noop() {}

// 实现双向绑定 v-model {{}} v-text v-html
// methods
// 实际上的data  options.data =>赋值 _data =>代理 $data  目的：防止_data根节点被直接修改
// props 同理
class Vue {
  constructor(options) {
    this.$options = options;
    this.$el = getElementBySelector(options.el);

    this.initData();
    this.initProps();
    this.initComputed();
    this.initWatch();
    this.initMethod();

    new Compiler(this);
  }

  $watch(expOrFn, cb, options) {
    const watcher = new Watcher(this, expOrFn, cb, options);
    cb.call(this, watcher.value);
  }

  initData() {
    let data = this.$options.data;
    data = this._data = isFunction(data) ? data() : data || {};
    if (!isPlainObject(data)) {
      data = {};
      console.warn("data参数错误！");
    }
    for (let key in data) {
      proxy(this, "_data", key);
    }
    // 让data可响应
    Observer(data);
  }

  initProps() {}

  // Computed是原本不存在于vm instance上的值
  initComputed() {
    const watchers = [];
    const computed = this.$options.computed;
    const computedOptions = { lazy: true };
    for (key in computed) {
      let userDef = computed[key];
      watchers[key] = new Watcher(this, userDef, noop, computedOptions);

      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          if (watchers[key].dirty) {
            // 调用computed定义的函数，并把这个watcher收集到computed函数中的响应式对象里去
            // 当响应式对象发生改变时，会触发update，把dirty置为true，下次调用computed时，它的值会更新
            // 所以说computed是有缓存的
            watchers[key].evaluate();
          }
          return watchers[key].value;
        },
        set: noop,
      });
    }
  }

  // watch是本来就存在于vm instance上的值
  initWatch() {
    const vm = this;
    const watch = this.$options.watch;
    for (let key in watch) {
      this.$watch(vm, key, watch[key]);
    }
  }
}

const descriptor = {
  configurable: true,
  enumerable: true,
  get: noop,
  set: noop,
};
function proxy(target, sourceKey, key) {
  descriptor.get = () => {
    return target[sourceKey][key];
  };
  descriptor.set = (value) => {
    target[sourceKey][key] = value;
  };
}

// TODO 可以做一次缓存，减少dom的查询消耗
function getElementBySelector(el) {
  let elm = null;
  if (typeof el === "string") {
    elm = document.querySelector(el);
  } else if (el instanceof HTMLElement) {
    elm = el;
  } else {
    console.error("找不到要挂载的元素！");
  }
  return elm;
}

let vm = new Vue({
  data: {
    name: "lz",
    height: 180,
    weight: 55,
    msg: "卷卷卷",
  },
  methods: {
    heightUp() {
      this.height++;
    },
  },
  computed: {
    desc() {
      return `身高${this.height}CM 体重${weight}KG`;
    },
  },
  watch: {
    height(newVal, oldVal) {
      console.log(`现在的身高${newVal}CM，之前的身高${oldVal}CM`);
    },
  },
  el: "#app",
});

console.log(vm);

import Compiler from "./compiler.js";
import Observer from "./observer.js";

// 实现双向绑定 v-model {{}} v-text v-html
// methods
class Vue {
  constructor(options) {
    this.$data = options.data;
    this.$methods = options.methods;

    this.$el = getElementBySelector(options.el);

    _proxy(this, this.$data);

    this.__ob__ = new Observer(this.$data);

    new Compiler(this);
  }
}

function _proxy(vm, data) {
  Object.keys(data).forEach((key) => {
    Object.defineProperty(vm, key, {
      enumerable: true,
      configurable: true,
      get() {
        return data[key];
      },
      set(value) {
        data[key] = value;
      },
    });
  });
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
    msg: "卷卷卷",
  },
  methods: {
    heightUp() {
      this.height++;
    },
  },
  el: "#app",
});

console.log(vm);

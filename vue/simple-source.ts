import { lifeCycleMixin, initLifeCycle } from "./lifecycle";
// Vue简单原理
function Vue(options) {
  this._init(options);
}

// 注入prototype
initMixin(Vue); // 属性初始化相关
// stateMixin(Vue); //
eventsMixin(Vue); // 监听函数相关
lifeCycleMixin(Vue);

let uid = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options?: Object) {
    const vm = Vue;
    vm._uid = uid++;
    vm.$options = options; // 简化的options

    initProxy(vm);

    // 初始化
    vm._self = vm;
    initLifeCycle(vm);
    initEvents(vm);
    //initRender();
    // 挂载vue instance
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initProxy(vm) {}

function initEvents(vm) {
  vm._events = Object.create(null);
}

function eventsMixin(Vue) {
  Vue.prototype.$on = function (event: string | Array<string>, fn: Function) {
    const vm = Vue;
    if (Array.isArray(event)) {
      for (let i = 0; i < event.length; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
    }
    return vm;
  };
  Vue.prototype.$off = function (
    event?: string | Array<string>,
    fn?: Function
  ) {
    const vm = Vue;
    // cancel all event
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    }
    // cancel all fn in event
    if (Array.isArray(event)) {
      for (let i = 0; i < event.length; i++) {
        vm.$off(event[i], fn);
      }
      return vm;
    }

    let cbs: Array<Function> = vm._events[event];
    if (!cbs) {
      return vm;
    }

    // specific event
    if (!fn) {
      vm._events[event] = null;
      return vm;
    }

    let cb;
    let i = cbs.length;
    while (i--) {
      cb = cbs[i];
      // cb.fn ==>取消$once的监听
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }
    return vm;
  };

  Vue.prototype.$emit = function (event: string) {
    const vm = Vue;
    let args = Array.prototype.slice.call(arguments, 1);
    const cbs = vm._events[event];
    if (!cbs) return vm;
    let len = vm._events[event].length;
    for (let i = 0; i < len; i++) {
      cbs[i].apply(vm, args);
    }
  };

  Vue.prototype.$once = function (event: string, fn: Function) {
    const vm = Vue;
    function on() {
      vm.$off(event, on); // 从vm._events[event] 数组中移除了on 的监听函数
      fn.apply(vm, arguments); // 执行fn
    }
    // 如果$once还未执行，想从外部注销该监听，则需要暴露出fn
    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };
}

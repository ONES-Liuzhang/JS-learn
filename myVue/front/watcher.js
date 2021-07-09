import Dep from "./dep.js";
import { isFunction } from "../utils";

// 观察者
export default class Watcher {
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm;
    this.cb = cb;

    if (options) {
      this.lazy = !!options.lazy;
      this.dirty = !!options.lazy;
    }

    // 如果是字符串 直接从vm上取，如果其是响应式的对象，则会自动收集依赖
    if (typeof expOrFn === "string") {
      this.getter = () => vm[expOrFn];
    } else if (isFunction(expOrFn)) {
      // 如果是个函数 -> computed 传入的值就是函数，直接执行获取值
      this.getter = expOrFn;
    }

    this.value = this.lazy ? undefined : this.get();
  }

  /** 触发wathcer的更新 */
  update() {
    if (this.lazy) {
      this.dirty = true;
    } else {
      const oldVal = this.value;
      const newVal = (this.value = this.getter());
      this.cb.call(this.vm, newVal, oldVal);
    }
  }

  /** watcher的求值 */
  get() {
    Dep.target = this;
    const vm = this.vm;
    let value;
    try {
      value = this.getter.call(vm);
    } catch (e) {
      console.error(`${this.getter.toString()}调用错误:`, e);
    }
    Dep.target = null;
    return value;
  }

  /** 如果options为lazy，则调用此方法触发watcher.get收集依赖 */
  evaluate() {
    this.value = this.get();
    this.dirty = false;
  }
}

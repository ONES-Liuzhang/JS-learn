import Dep from "./dep.js";

// 观察者
export default class Wacther {
  constructor(vm, data, cb) {
    this.vm = vm;
    this.data = data;
    this.cb = cb;

    Dep.target = this;

    // 触发vm.$data.data的getter
    this.oldVal = vm[data];

    Dep.target = null;
    this.cb.call(this.vm, this.oldVal);
  }

  /** 触发wathcer的更新 */
  update() {
    const oldVal = this.oldVal;
    const newVal = (this.oldVal = this.vm[this.data]);
    this.cb.call(this.vm, newVal, oldVal);
  }
}

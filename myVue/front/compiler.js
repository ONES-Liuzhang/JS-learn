import Watcher from "./watcher.js";

export default class Compiler {
  constructor(vm) {
    this.el = vm.$el;
    this.methods = vm.$methods;
    this.vm = vm;

    this.compile(this.el);
  }

  compile(el) {
    if (this.isTextNode(el)) {
      // 是否是文本节点
      this.compileText(el);
    } else if (this.isElementNode(el)) {
      // 是否是元素节点
      this.compileElement(el);
    }

    // 是否有子节点
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach((node) => {
      this.compile(node);
    });
  }

  /** 编译文本节点 */
  compileText(el) {
    const textContent = el.textContent;
    const reg = /\{\{(.+?)\}\}/;
    if (reg.test(textContent)) {
      const key = RegExp.$1.trim();

      new Watcher(this.vm, key, (newVal) => {
        el.textContent = newVal;
      });
    }
  }

  compileElement(el) {
    const attributes = el.attributes;
    Array.from(attributes).forEach((attr) => {
      const attrName = attr.name;
      if (this.isDirectiveAttr(attrName)) {
        // v-text、v-html、v-on:click、v-model
        const directive = this.getDirective(attrName);
        // 更新DOM元素
        this.update(this.vm, el, directive);
      }
    });
  }

  update(vm, el, directive) {
    const updateFn = this[directive + "Updater"];
    updateFn && updateFn.call(this, vm, el, directive);
  }

  textUpdater(vm, el, directive) {}

  htmlUpdater(vm, el, directive) {}

  clickUpdater(vm, el, directive) {}

  getDirective(attrName) {
    return attrName.indexOf(":") > -1 ? attrName.substr(5) : attrName.substr(2);
  }

  /** 是否是指令属性 */
  isDirectiveAttr(attrName) {
    return attrName.startsWith("v-");
  }

  /** 判断是否为文本节点 */
  isTextNode(el) {
    return el.nodeType === Node.TEXT_NODE;
  }

  /** 判断是否为元素节点 */
  isElementNode(el) {
    return el.nodeType === Node.ELEMENT_NODE;
  }
}

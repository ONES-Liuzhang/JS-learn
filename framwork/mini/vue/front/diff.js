/**
 * vue2 diff算法
 *
 *        定义虚拟VNode结构
 * VNode {
 *    tag: string,     // 识别标签
 *    data: VNodeData,    // 标签上的属性
 *    children: Array, // 子节点
 *    parent: VNode,   // 父节点
 *    text: string,    // 文本节点
 *    el: Element      // 挂载的dom元素
 * }
 *
 * VNodeData {
 *    attr: Object,
 *    class: Object,
 *    style: Object,
 *    listener: Object
 * }
 *
 * h -> createElement
 * h("div", { class: "box" }, [
 *    h("ul", { class: "nav" }, [
 *      h("li", { class: "item" }, "hello world")
 *    ])
 * ])
 *
 * DOM 文本节点和元素节点的区别
 * 文本节点 nodeType === 3
 */

const h = createElement;
const vnode = h("div", { class: "box" }, [
  h("ul", { class: "nav" }, [h("li", { class: "item" }, "hello world")]),
]);

console.log(JSON.stringify(vnode));

const nodeOpts = require("./node-opts");

function isDef(obj) {
  return obj !== undefined && obj !== null;
}

function isUnDef(obj) {
  return obj === undefined || obj === null;
}

/** 是否为相同的标签，如果tag不同 直接返回false，否则比较key值是否一致 */
function isSameNode(a, b) {
  return a.key === b.key && a.tag === b.tag;
}

function createElement(tag, data, children) {
  // 简单判断是否是文本节点
  // TODO: 打平数组 normalizeChildren
  if (typeof children === "string") {
    return {
      tag: "",
      data: null,
      children: null,
      text: children,
      el: null,
    };
  }
  return {
    tag,
    data,
    children,
    el: null,
  };
}

function patch(oldVNode, vnode) {
  if (isUnDef(oldVNode)) {
    // 没有老的vnode， TODO: 新增 root 节点
    createElm(vnode);
  } else {
    // 有老的vnode，并且 oldVNode 和 vnode 是同类型比较，走diff
    if (isSameNode(oldVNode, vnode)) {
      patchVNode(oldVNode, vnode);
    } else {
      // oldVNode 和 vnode 非同类型 或者没有key，直接替换
      const oldElm = oldVNode.el;
      const parentElm = oldElm.parentNode;

      // parent.insertBefore(newElm, reference)
      createElm(vnode, parentElm, oldElm.nextSibling);

      if (parentElm) {
        // TODO
      }
    }
  }

  return vnode.el;
}

function patchVNode(oldVNode, vnode) {
  const oldCh = oldVNode.children;
  const newCh = vnode.children;

  /**
   * 老节点没有children
   * <div>            <div>
   *            =>       <p>hello</p>
   * </div>           </div>
   */
  if (isDef(oldCh)) {
  }
}

function createElm(vnode, parentElm, refElm) {
  const { data, children, tag } = vnode;
  if (isUnDef(tag)) {
    // 文本节点
    const text = vnode.text;
    vnode.el = nodeOpts.createTextNode(text);
  } else {
    const elm = nodeOpts.createElement(tag, data);
    // 元素节点
    for (let i = 0; i < children.length; i++) {
      children[i];
    }
  }
}

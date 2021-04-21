// web dom相关操作

const namespaceMap = {
  svg: "http://www.w3.org/2000/svg",
  math: "http://www.w3.org/1998/Math/MathML",
};

export function createElement(tagName: string, vnode: VNode): Element {
  const elm = document.createElement(tagName);
  if (tagName !== "select") {
    return elm;
  }
  // false or null will remove the attribute but undefined will not
  if (
    vnode.data &&
    vnode.data.attrs &&
    vnode.data.attrs.multiple !== undefined
  ) {
    elm.setAttribute("multiple", "multiple");
  }
  return elm;
}

// 返回一个带命名空间的HTMLElement
export function createElementNS(namespace: string, tagName: string): Element {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

// 文本节点
export function createTextNode(text: string): Text {
  return document.createTextNode(text);
}

// 创建并返回一个注释节点
export function createComment(text: string): Comment {
  return document.createComment(text);
}

// 将newNode插入到parentNode中 referenceNode之前
// <oldParent><newNode></newNode></oldParent>
// <Parent>  /* newNode直接移动到这里 */  <referenceNode></deferenceNode><Parent>
export function insertBefore(
  parentNode: Node,
  newNode: Node,
  referenceNode: Node
) {
  parentNode.insertBefore(newNode, referenceNode);
}

export function removeChild(node: Node, child: Node) {
  node.removeChild(child);
}

export function appendChild(node: Node, child: Node) {
  node.appendChild(child);
}

// parentNode是指定节点的父节点.一个元素节点的父节点可能是一个元素(Element )节点,也可能是一个文档(Document )节点,或者是个文档碎片(DocumentFragment)节点.
export function parentNode(node: Node): ?Node {
  return node.parentNode;
}

// node.nextSibling 是一个只读属性，返回其父节点的 childNodes 列表中紧跟在其后面的节点，如果指定的节点为最后一个节点，则返回 null
export function nextSibling(node: Node): ?Node {
  return node.nextSibling;
}

// element.tagName 是一个字符串,包含了element元素的标签名;对于元素节点来说,tagName属性的值和nodeName属性的值是相同的.
export function tagName(node: Element): string {
  return node.tagName;
}

export function setTextContent(node: Node, text: string) {
  node.textContent = text;
}

// element.setAttribute(name, value)
export function setStyleScope(node: Element, scopeId: string) {
  node.setAttribute(scopeId, "");
}

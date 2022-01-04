/** 创建DOM */
function createElm(vnode, parentEl, refEl) {
  const { tag, children, data } = vnode;
  const attributes = data.attr;

  const el = document.createElement(tag);

  Object.entries.call(attributes).forEach(([key, val]) => {
    el.setAttributes(key, val);
  });

  parentEl.insertBefore(el, refEl);

  createChildren(children, el);
}

function createChildren(children, el) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      createElm(children[i], el);
    }
  }
}
/**
 * VNode: {
 *    tag: "div",
 *    key: "key1",
 *    elm: "DOM",
 *    data: {
 *      attrs: {},
 *      class: {},
 *      style: {}
 *    },
 *    text: "",
 *    children: []
 * }
 */
function patch(oldVNode, VNode) {
  // 1. 如果两个节点相同，并且设置了`key`值
  if (sameNode(oldVNode, VNode)) {
    patchVNode(oldVNode, VNode);
  } else {
    // 2. 如果不同，则删除老节点，在同样的位置新增新节点
    const oldEl = oldVNode.elm;
    const parentEl = oldEl.parentNode;

    createElm(VNode, parentEl, oldEl.nextSibling());

    // 移除旧节点
    parentEl.removeChild(oldEl);
  }
}

// 标签类型相同，可以只更新data
function patchVNode(oldVNode, VNode) {
  const el = (oldVNode.elm = VNode.elm);
  const ch = VNode.children;
  const oldCh = VNode.children;

  if (!oldVNode.text) {
    // 元素节点
    if (!oldCh && ch) {
      // 1. 老的有子元素，新的没有
      el.children.forEach((c) => el.removeChild(c));
    } else if (oldCh && !ch) {
      // 直接把 VNode 挂载到 el 上
      createElm(VNode, el);
    } else {
      patchChildren(el, oldCh, ch);
    }
  } else {
    // 文本节点
    el.textContent = VNode.text;
  }
}

// 🌟🌟 diff 算法
function patchChildren(parentEl, oldCh, ch) {
  // 1. 双端比较法，缩小范围
  let oldStartIdx = 0,
    newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1,
    newEndIdx = ch.length - 1;
  let oldStartVNode = oldCh[oldStartIdx];
  let oldEndVNode = oldCh[oldEndIdx];
  let keyToOldIdx, idxInOld;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (!oldStartVNode) {
      oldStartVNode = oldCh[++oldStartIdx];
    } else if (!oldEndVNode) {
      oldEndVNode = oldCh[++oldEndIdx];
    }
    // 双端比较，缩小范围
    else if (sameNode(oldStartVNode, newStartVNode)) {
      patchVNode(oldStartVNode, newStartVNode);
      oldStartVNode = oldCh[++oldStartIdx];
      newStartVNode = ch[++newStartIdx];
    } else if (sameNode(oldEndVNode, newEndVNode)) {
      patchVNode(oldEndVNode, newEndVNode);
      oldEndVNode = oldCh[--oldEndIdx];
      newEndVNode = ch[--newEndIdx];
    } else {
      // 这是没有做优化（最长上升子序列）的节点移动
      keyToOldIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      idxInOld = oldStartVNode.key ? keyToOldIdx[oldStartVNode.key] : null;
      if (!idxInOld) {
        // 这是一个新增的节点
        createElm(newStartVNode, parentEl, oldStartVNode.elm);
      } else {
        // 需要移动节点
        const vnodeToMove = oldCh[idxInOld];
        // key相等也有可能元素类型不同，要做一次判断
        if (sameNode(vnodeToMove, newStartVNode)) {
          patchVNode(vnodeToMove, newStartVNode);
          parentEl.insertBefore(oldStartVNode.elm, newStartVNode.elm);
        } else {
          createElm(newStartVNode, parentEl, oldStartVNode.elm);
          parentEl.removeChild(oldStartVNode.elm);
        }
      }
      newStartVNode = ch[++newStartIdx];
    }
  }
  if (oldStartIdx > oldEndIdx) {
    // TODO 新vnode还有需要增加的节点
    addVNodes();
  } else if (newStartIdx > newOldIdx) {
    removeVNodes();
  }
}

function diff() {}

/** 最长上升子序列 动态规划 复杂度 O(n2) */
function longestSeq(arr) {
  // dp[i] 表示以 arr[i] 结尾的最长上升子序列
  const dp = new Array(arr.length).fill(1);
  let max = 1;
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      dp[i] = arr[i] > arr[j] ? Math.max(dp[j] + 1, dp[i]) : dp[i];
    }
    max = Math.max(max, dp[i]);
  }
  return max;
}

// key -> index 映射关系
function createKeyToOldIdx(vnodes, start, end) {
  const map = Object.create(null);
  let cur = start;
  while (cur <= end) {
    const key = vnodes[cur].key;
    map[key] = cur;
  }
}

function sameNode(a, b) {
  return a.key === b.key && a.tag === b.tag;
}

// 合并两个有序列表
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// 1. 暴力解
var mergeTwoLists1 = function (l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;
  // init 以l1为基准插入l2的值
  if (l1.val > l2.val) [l1, l2] = [l2, l1];

  let head = l1;

  while (l1.next && l2) {
    let left = l2;
    //1. l2 在 (l1, l1.next)之间
    let l2_pre = l2;
    while (l2 && l2.val >= l1.val && l2.val <= l1.next.val) {
      l2_pre = l2;
      l2 = l2.next;
    }

    // l2_pre与l2相等 说明 l2 > l1.next
    if (l2_pre === l2) {
      l1 = l1.next;
    } else {
      // 插入 (left,l2_pre) 到(l1,l1.next)
      let l1_next = l1.next;
      l1.next = left;
      l2_pre.next = l1_next;
      l1 = l1_next;
    }
  }

  if (!l1.next) l1.next = l2;

  return head;
};

// 2. 递归
function mergeTwoLists2(l1, l2) {
  return merge(l1, l2);

  function merge(h1, h2) {
    if (!h1) return h2;
    if (!h2) return h1;
    if (h1.val < h2.val) {
      h1.next = merge(h1.next, h2);
      return h1;
    } else {
      h2.next = merge(h2.next, h1);
      return h2;
    }
  }
}

// 3. 迭代
function mergeTwoList3(l1, l2) {
  let dummy = new ListNode(null);
  let node = dummy;
  while (l1 && l2) {
    if (l1.val < l2.val) {
      node.next = l1;
      node = node.next;
      l1 = l1.next;
    } else {
      node.next = l2;
      node = node.next;
      l2 = l2.next;
    }
  }
  if (!l1) node.next = l2;
  if (!l2) node.next = l1;

  return dummy.next;
}

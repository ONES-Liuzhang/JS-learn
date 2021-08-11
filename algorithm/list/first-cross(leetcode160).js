// 编写一个程序，找到两个单链表相交的起始节点。
/**
 * function ListNode(val) {
 *    this.val = val
 *    this.next = null
 * }
 */

// 时间复杂度 O(m*n)
// 空间复杂度 O(1)
function listFirstCross(headA, headB) {
  let node1 = headA;
  let node2 = headB;
  // 遍历
  while (node1) {
    while (node2) {
      if (node1 === node2) {
        return node1;
      }
      node2 = node2.next;
    }
    node1 = node1.next;
  }
  return null;
}

// 双指针
function listFirstCross2(headA, headB) {
  let pA = headA;
  let pB = headB;

  while (pA || pB) {
    if (pA == pB) return pA;
    pA ? (pA = pA.next) : (pA = headB);
    pB ? (pB = pB.next) : (pB = headA);
  }
  return null;
}

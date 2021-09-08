/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 链表的排序 冒泡 - 超时
 * [leetCode 剑指 Offer II 077. 链表排序] https://leetcode-cn.com/problems/7WHec2/
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
  let dummy = new ListNode(-Number.MIN_SAFE_INTEGER);
  dummy.next = head;
  let pre = dummy;
  let n = 0;

  while (head) {
    n++;
    head = head.next;
  }

  // 冒泡 - 超时
  while (n-- > 0) {
    let count = 0;
    while (count < n && pre.next && pre.next.next) {
      count++;
      const curr = pre.next;
      const next = curr.next;
      if (curr.val > next.val) {
        pre.next = next;
        curr.next = next.next;
        next.next = curr;
      }
      pre = pre.next;
    }
    pre = dummy;
  }

  return dummy.next;
};

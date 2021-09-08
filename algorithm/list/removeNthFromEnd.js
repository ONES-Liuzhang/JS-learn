const ListNode = require("./listNode");

/** 删除倒数第n个节点 快慢指针 */
function removeNthFromEnd(head, n) {
  const dummy = new ListNode();
  let l = dummy;
  let r = dummy;
  dummy.next = head;

  while (n-- && r) {
    r = r.next;
  }
  // n 比 list的长度要大
  if (n > 0 || !r) return head;

  while (r.next) {
    l = l.next;
    r = r.next;
  }

  // r.next === null 时，l的位置是要删除的节点的前置节点
  if (l.next) {
    l.next = l.next.next ? l.next.next : null;
  }

  return dummy.next;
}

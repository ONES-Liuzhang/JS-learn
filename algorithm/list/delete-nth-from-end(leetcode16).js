function ListNode(val) {
  this.val = val;
  this.next = null;
}
// 删除链表的倒数第n个节点
function deleteNthFromEnd(head, n) {
  // 增加一个哑节点
  let dummy = new ListNode();
  dummy.next = head;
  let p1, p2;
  p1 = dummy;
  p2 = head;

  let i = 1;
  while (p2 && i < n) {
    p2 = p2.next;
    i++;
  }
  // n超出了链表长度
  if (!p2) return head;

  while (p1.next && p2.next) {
    p1 = p1.next;
    p2 = p2.next;
  }
  // p1 为要删除的节点之前的节点
  p1.next = p1.next ? p1.next.next : null;
  return head;
}

const List = require("./list.js");

/** 1. 单链表反转 */
function ListReverse(head) {
  if (!head) return;

  let curr = head;
  let pre, next;

  // 只有当 当前node和下一个node存在时才需要反转操作
  while (curr) {
    next = curr.next;
    curr.next = pre;
    pre = curr;
    curr = next;
  }

  head = pre;
  return head;
}

const l1 = List.crateListFromArr([1, 2]);

console.log("---1. 反转链表---");
List.log(l1.head);
l1.head = ListReverse(l1.head);
List.log(l1.head);
console.log("---------------");

// 2. 链表中环的检测
function hasRing(head) {
  if (!head) return null;

  let slow = head;
  let fast = head;

  while (slow && fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true;
    }
  }

  return false;
}

// l1.last.next = l1.head;
console.log("2.是否含有环：", hasRing(l1.head));
console.log("---------------");

const merge1 = List.crateListFromArr([1, 4, 5]);
const merge2 = List.crateListFromArr([1, 3, 4]);

/** 3. 两个有序列表合并 */
function mergeList(head1, head2) {
  if (head1 === null) return head2;
  if (head2 === null) return head1;

  let dummy = new List.Node();
  let curr = dummy;
  let l1 = head1;
  let l2 = head2;

  while (l1 && l2) {
    if (l1.value <= l2.value) {
      curr.next = l1;
      curr = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      curr = l2;
      l2 = l2.next;
    }
  }

  if (l1) {
    curr.next = l1;
  } else if (l2) {
    curr.next = l2;
  }

  return dummy.next;
}
console.log("---3.合并链表---");
List.log(merge1.head);
List.log(merge2.head);

const mergedHead = mergeList(merge1.head, merge2.head);

List.log(mergedHead);

/** 4.删除倒数第k个节点 要找第 k - 1个节点才行 */
/**
 * let l = head;
 *  let r = head;
 *  while(r) {
 *      r = r.next
 *      if(k > 0) k--
 *      else l = l.next
 *  }
 *  return l
 * 剑指 Offer II 021
 */
function deleteK(head, k) {
  if (!head || k <= 0) return head;

  let dummy = new List.Node();
  dummy.next = head;
  let theK = head;
  let curr = dummy;

  while (theK) {
    theK = theK.next;
    if (k > 0) {
      k--;
    } else {
      curr = curr.next;
    }
  }

  curr.next = curr.next.next;

  return dummy.next;
}

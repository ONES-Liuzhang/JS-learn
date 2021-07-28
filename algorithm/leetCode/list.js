// 链表题目
function ListNode(val) {
  this.val = val;
  this.next = null;
}

function log(head) {
  let node = head;
  const result = [];
  while (node) {
    result.push(node.val);
    node = node.next;
  }
  console.log(result);
  return result;
}

let l1 = new ListNode(1);
let l2 = new ListNode(2);
let l3 = new ListNode(3);
let l4 = new ListNode(4);
let l5 = new ListNode(5);

function linkNode(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    arr[i].next = arr[i + 1];
  }
}

linkNode([l1, l2, l3, l4, l5]);

// 1. 反转链表
// 一、递归
function reverseList(head) {
  let result = null;
  reverse(head);
  if (head) head.next = null;

  return result;
  function reverse(node) {
    if (!node) return;
    if (!node.next) {
      result = node;
      return node;
    } // 尾节点

    let next = reverse(node.next);
    next.next = node;
    return node;
  }
}

// 2. 反转部分链表 left -> right
function reverseBetween(head, left, right) {
  let step = right - left;
  if (step < 1) return head;
  const dummy = new ListNode();
  dummy.next = head;
  let curr = dummy;
  let start = null; // 首
  let end = null; // 尾
  while (left--) {
    start = curr;
    curr = curr.next;
  }
  let reverseHead = reverse(curr, step);
  start.next.next = end;
  start.next = reverseHead;
  return dummy.next;

  function reverse(node, count) {
    if (count === 0) {
      end = node.next;
      return node;
    }

    let reverseHead = reverse(node.next, count - 1);
    node.next.next = node;
    node.next = null;
    return reverseHead;
  }
}

log(reverseList(l1));
log(reverseBetween(l5, 2, 4));

// 优雅的递归
function reverseList2(head) {
  if (!head || !head.next) return head;

  // 旋转head.next链表 并且返回它的头
  let reverseHead = reverseList2(head.next);
  head.next.next = head;
  head.next = null;

  return reverseHead;
}

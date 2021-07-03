// 从尾到头打印链表
var reversePrint = function (head) {
  if (!head) return [];
  let queue = reversePrint(head.next);
  queue.push(head.val);
  return queue;
};

function List(head) {
  this.head = head;
}

function Node(val) {
  this.val = val;
  this.next = null;
}

let node1 = new Node(1);
let node2 = new Node(2);
let node3 = new Node(3);

node1.next = node2;
node2.next = node3;

let l = new List(node1);

console.log(reversePrint(l.head));

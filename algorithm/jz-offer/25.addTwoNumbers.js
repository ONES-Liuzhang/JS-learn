const List = require("../list/list.js");
const ListNode = List.Node;

function addTwoNumbers(l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;
  let node1 = l1;
  let node2 = l2;

  const arr1 = [];
  const arr2 = [];

  while (node1) {
    arr1.push(node1.value);
    node1 = node1.next;
  }

  while (node2) {
    arr2.push(node2.value);
    node2 = node2.next;
  }

  const len1 = arr1.length;
  const len2 = arr2.length;
  let diff = Math.abs(len1 - len2);

  if (len1 > len2) {
    while (diff > 0) {
      arr2.unshift(0);
      diff--;
    }
  } else {
    while (diff > 0) {
      arr1.unshift(0);
      diff--;
    }
  }

  const n = arr1.length;

  let tenDigit = 0;
  const newArr = [];

  for (let i = n - 1; i >= 0; i--) {
    let result = arr1[i] + arr2[i];

    result = tenDigit ? tenDigit + result : result;

    tenDigit = Math.floor(result / 10);

    if (tenDigit > 0) {
      newArr.unshift(result % 10);
    } else {
      newArr.unshift(result);
    }
  }

  if (tenDigit > 0) {
    newArr.unshift(tenDigit);
  }

  const nodeHead = new ListNode();
  let node = nodeHead;
  for (let i = 0; i < newArr.length; i++) {
    node.next = new ListNode(newArr[i]);
    node = node.next;
  }

  return nodeHead.next;
}

const l1 = new List();
l1.add(7);
l1.add(2);
l1.add(4);
l1.add(3);

const l2 = new List();
l2.add(5);
l2.add(6);
l2.add(4);

console.log(addTwoNumbers(l1.head, l2.head));

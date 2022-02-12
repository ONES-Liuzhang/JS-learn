class Node {
  constructor(val) {
    this.value = val;
    this.prev = null;
    this.next = null;
  }
}

class List {
  constructor() {
    this.header = null;
    this.size = 0;
    this.last = null;
  }

  add(val) {
    const node = new Node(val);
    if (!this.header) {
      this.header = node;
      this.last = node;
    } else {
      node.prev = this.last;
      this.last.next = node;
      this.last = node;
    }
    this.size++;
  }
}

// 使用双向链表来判断回文字符串
function isPalindrome(str) {
  if (str.length === 1) return true;
  if (str.length === 2) return str.charAt(0) === str.charAt(1);

  const list = new List();
  for (let i = 0; i < str.length; i++) {
    list.add(str.charAt(i));
  }

  let l = list.header;
  let r = list.last;

  while (l.prev !== r && l !== r) {
    if (l.value !== r.value) {
      return false;
    }
    l = l.next;
    r = r.prev;
  }

  return true;
}

console.log(isPalindrome("aba"));

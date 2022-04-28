/** 双向链表Node */
class DLinkedNode {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.pre = null;
  }
}

/**
 * 最近最少使用 LRU
 *
 * put
 * 查询 如果有，则 删除 并且 插入到头部；如果没有，则 直接插入到头部
 *
 * get
 * 查询 如果有，则返回该节点，删除双向链表中的这个节点，插入到头部
 *
 */
class LRU {
  constructor(poolSize) {
    this.hashMap = new Map();
    // 使用两个哑节点 head 和 tail
    this.head = new DLinkedNode();
    this.tail = new DLinkedNode();
    this.head.next = this.tail;
    this.tail.pre = this.head;
    this.size = 0;
    this.limit = poolSize;
  }

  // 添加元素
  put(val) {
    const existNode = this.hashMap.get(val);
    if (existNode) {
      this.moveToHead(existNode);
    } else {
      this.addToHead(val);
    }

    if (this.limit < this.size) {
      this.removeTail();
    }
  }

  // 获取元素
  get(val) {
    const existNode = this.hashMap.get(val);
    if (existNode) {
    }
  }

  // 删除末尾元素
  removeTail() {
    const lastNode = this.tail.pre;
    const pre = lastNode.pre;
    pre.next = this.tail;
    this.tail.pre = pre;

    this.hashMap.delete(lastNode.val);
    this.size--;

    lastNode.pre = null;
    lastNode.next = null;
  }

  // 移动到头部
  moveToHead(node) {
    const pre = node.pre;
    const next = node.next;
    pre && (pre.next = next);
    next && (next.pre = pre);

    const headNext = this.head.next;
    this.head.next = node;
    node.next = headNext;
    headNext.pre = node;
    node.pre = this.head;
  }

  // 新增一个到头部
  addToHead(val) {
    const node = new DLinkedNode(val);

    this.hashMap.set(val, node);
    this.size++;

    const headNext = this.head.next;
    this.head.next = node;
    node.pre = this.head;
    node.next = headNext;
    headNext.pre = node;
  }

  toString() {
    let node = this.head.next;
    const result = [];
    while (node) {
      result.push(node.val);
      node = node.next;
    }

    console.log(result);
  }
}

const lru = new LRU(3);

lru.put(1);
lru.put(2);
lru.put(3);
lru.put(4);
lru.put(3);
console.log(lru, lru.toString());

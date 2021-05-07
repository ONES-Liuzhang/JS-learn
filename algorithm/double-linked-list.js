// 双链表
function DoubleLinkedList() {
  let Node = function (element) {
    this.data = element;
    this.next = null;
    this.pre = null;
  };

  let head = null;
  let tail = null;
  let length = 0;

  /**
   * 插入一个节点
   * 边界条件
   * 1. position < 0 或 position > length 时 返回null
   * @param {Number} position
   * @param {*} element
   */
  this.insert = function (position, element) {
    if (position < 0 || position > length) return null;

    let node = new Node(element);
    // 如果链表为空
    if (!head) {
      head = node;
      tail = node;
      length++;
      return;
    }
    // 新增哑节点
    let dummy = new Node();
    dummy.next = head;

    let curr = dummy;
    let pos = 0;
    while (pos < position) {
      curr = curr.next;
      pos++;
    }
    if (curr === dummy) {
      // 头节点
      node.next = head;
      head.pre = node;
      head = node;
    } else if (!curr.next) {
      // 尾节点
      curr.next = node;
      node.pre = curr;
      tail = node;
    } else {
      node.pre = curr;
      node.next = curr.next;
      curr.next.pre = node;
    }

    length++;
  };

  this.getList = function () {
    return head;
  };
  this.remove = function() {}
}

const doubleList = new DoubleLinkedList();

doubleList.insert(0, 1);
doubleList.insert(0, 2);
doubleList.insert(2, 3);

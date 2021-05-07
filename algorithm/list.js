// 链表
function List() {
  function Node(val) {
    this.data = val;
    this.next = null;
  }

  // 私有变量
  let head = null;
  // 链表长度
  let length = 0;

  this.getList = function () {
    return head;
  };
  this.size = function () {
    return length;
  };
  // 增加节点
  this.append = function (element) {
    let node = new Node(element);
    let p = head;
    if (!head) {
      head = node;
    } else {
      while (p.next) {
        p = p.next;
      }
      p.next = node;
    }
    length++;
  };
  /**
   * 删除节点
   * @param {*} element
   * @returns 删除成功返回true， 未找到元素返回false
   */
  this.remove = function (element) {
    let dummy = new Node();
    dummy.next = head;
    let pre = dummy,
      curr = head;
    while (curr) {
      if (curr.data === element) {
        pre.next = curr.next;
        length--;
        return true;
      }
      pre = curr;
      curr = curr.next;
    }
    return false;
  };

  /**
   * 插入元素，将position位置处的元素向后挤一位
   * 边界条件：
   * 1. head = null 并且pos = 0时，直接令head = element
   * 2. pos < 0 或 pos > length - 1 时 插入失败 返回null
   * 3. 如果插入位置position=0，插入完毕要对head进行重新赋值
   * @param {Number} position 位置
   * @param {*} element 元素
   */
  this.insert = function (position, element) {
    // 边界条件
    if (position < 0 || position > length) {
      return null;
    }
    // 如果head不存在，直接赋值
    if (!head) {
      head = node;
      length++;
      return;
    }

    // 边界条件 END
    let node = new Node(element);
    // 新增一个哑节点
    let dummy = new Node();
    dummy.next = head;

    let curr = dummy;
    // 开始遍历寻找position位置之前的那个元素
    for (let pos = 0; pos < position; pos++) {
      curr = curr.next;
    }

    node.next = curr.next;
    curr.next = node;
    // 如果插入位置为0 要对head重新赋值
    if (position === 0) {
      head = node;
    }
    length++;
  };

  /**
   * 查找元素
   * @param {*} element
   */
  this.search = function (element) {
    let curr = head;
    while (curr) {
      if (curr.data === element) {
        return curr;
      }
      curr = curr.next;
    }
    return null;
  };
  this.isEmpty = function () {
    return !length;
  };
}

const list = new List();
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.append(5);

list.insert(0, 6);
console.log(list.getList());

list.remove(3);
list.remove(6);

list.remove(10);

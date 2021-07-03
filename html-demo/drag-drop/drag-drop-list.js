class DragDropList {
  constructor(el) {
    for (let i = 0; i < el.children.length; i++) {
      new DragDropListItem(this, el.children[i], i);
    }
  }
}

class DragDropListItem {
  constructor(parent, el, id) {
    this.parentNode = parent;
    this.id = id;
    this.el = el;
    el._instance = this;
    this.nextNode = el.nextSibling;
    this.defaultBg = el.style.background;
    this.placeholder = null;

    this.onMouseDown.bind(this);
    this.onMouseMove.bind(this);

    this.relative = {};
    el.addEventListener("mousedown", (e) => {
      this.onMouseDown(e);
      document.addEventListener("mousemove", this.onMouseMove);
    });

    // 清除事件
    document.addEventListener("mouseup", () => {
      // 删除空节点

      document.removeEventListener("mousemove", this.onMouseMove);
      el.removeEventListener("mousedown", this.onMouseDown);
    });
  }

  onMouseDown(e) {
    let el = e.target;
    let parent = el.parentNode;
    // 鼠标相对元素的位置
    el._instance.relative = {
      x: e.clientX - el.offsetLeft,
      y: e.clientY - el.offsetTop,
    };
    // 创建一个占位元素，插入当前节点的位置
    let blank = document.createElement("li");

    // 元素的拖拽状态
    el.style.position = "absolute";
    el.style.left = el.offsetLeft + "px";
    el.style.top = el.offsetTop + "px";
    el.style.border = "2px dashed #666";
    el.style.background = "#03f48f";

    blank.style.visibility = "hidden";
    parent.insertBefore(blank, el);
  }

  onMouseMove(e) {
    // 鼠标位置
    let { clientX, clientY } = e;
    let el = e.target;
    let instance = el._instance;
    // 计算元素位置
    let left = clientX - instance.relative.x;
    let top = clientY - instance.relative.y;

    el.style.left = left;
    el.style.top = top;

    // 判断元素应该插入到第几个元素
  }
}

class DragDrop {
  constructor(el) {
    this.el = el;
    this.relative = {}; // 鼠标点击位置相对元素的位置
    // 初始化元素相对父元素的位置
    this.position = {
      top: el.offsetTop,
      left: el.offsetLeft,
    };
    this.onMouseMove = this.onMouseMove.bind(this);

    el.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const { clientX, clientY } = e;
      this.relative.left = clientX - this.position.left;
      this.relative.top = clientY - this.position.top;

      document.addEventListener("mousemove", this.onMouseMove);
    });
    // 鼠标松开，移除事件
    document.addEventListener("mouseup", () => {
      // 更新当前位置
      this.updatePosition();
      document.removeEventListener("mousemove", this.onMouseMove);
    });
  }

  // 更新元素的当前位置
  updatePosition() {
    let el = this.el;
    this.position.left = el.offsetLeft;
    this.position.top = el.offsetTop;
  }

  onMouseMove(e) {
    // 新的鼠标位置
    let { clientX, clientY } = e;
    let el = this.el;
    el.style.top = clientY - this.relative.top;
    el.style.left = clientX - this.relative.left;
  }
}

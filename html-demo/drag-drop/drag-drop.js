class DragDrop {
  constructor(el) {
    const { offsetLeft, offsetTop, offsetParent } = el;
    this.el = el;
    // 鼠标点击位置相对元素的位置
    this.relative = {};
    // 初始化元素相对父元素的位置
    this.position = {
      top: offsetTop,
      left: offsetLeft,
    };
    this.parentEl = offsetParent;

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
    const { clientX, clientY } = e;
    const el = this.el;
    const parentEl = this.parentEl;
    // 使用offsetWidth和offsetHeight来获取元素宽度和高度 包含了border宽度
    const { offsetWidth, offsetHeight } = el;
    // 使用clentWidth和clientHeight获取父元素的宽度和高度 不包含border
    const { clientWidth: parentWidth, clientHeight: parentHeight } = parentEl;
    // 固定在父元素的范围内拖动
    el.style.top = Math.min(
      Math.max(clientY - this.relative.top, 0),
      parentHeight - offsetHeight
    );
    el.style.left = Math.min(
      Math.max(clientX - this.relative.left, 0),
      parentWidth - offsetWidth
    );
  }
}
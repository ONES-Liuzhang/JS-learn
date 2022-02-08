/** 生成乱序数组 */
export function genRandomArray(len) {
  const arr = new Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = Math.floor(Math.random() * 180);
  }

  return arr;
}

/** 画笔 */
export class Drawer {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(shape) {
    if (!shape) return;
    const ctx = this.ctx;

    shape.draw(ctx);
  }
}

/** 长方形 */
export class Rect {
  constructor(x, y, height = 3, width = 3) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.height, this.width);
    ctx.closePath();
  }
}

// 堆排序

export default class Node {
  constructor(params) {
    const { x, y, height, width, parentNode, level, field } = params;

    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.parent = parentNode;
    this.level = level;
    this.field = field;
    this.children = [];
  }
}

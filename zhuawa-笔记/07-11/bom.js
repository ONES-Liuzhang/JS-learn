class BomEvent {
  constructor(el) {
    this.el = el;
  }

  addEvent(type, handler) {
    if (this.el.addEventListener) {
      // DOM2 事件处理程序 addEventListener的默认作用对象为el -> this指向el
      this.el.addEventListener(type, handler);
    } else if (this.el.attachEvent) {
      // attachEvent默认作用对象为window -> this指向window
      this.el.attachEvent(`on${type}`, handler);
    } else {
      // DOM0 事件处理程序 -> this指向el
      this.el[`on${type}`] = handler;
    }
  }

  removeEvent(type, handler) {
    if (this.el.removeEventListener) {
      this.el.removeEventListener(type, handler);
    } else if (this.el.detachEvent) {
      this.el.detachEvent(`on${type}`, handler);
    } else {
      this.el[`on${type}`] = null;
    }
  }
}

// 防止自身事件 参数是一个event事件
function preventDefault(ev) {
  // 现代浏览器都支持
  if (ev.preventDefault) {
    ev.preventDefault();
  } else {
    ev.returnValue = false; // 兼容IE
  }
}

// 防止事件传播
function stopPropagation(ev) {
  if (ev.stopPropagation) {
    ev.stopPropagation();
  } else {
    ev.cancelBubble = false; // IE只有冒泡，没有捕获
  }
}

// 使用
let el = document.getElementById("xxx");
let ev = new BomEvent(el);

preventDefault(ev);
stopPropagation(ev);

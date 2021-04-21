var _uid = 0;
// 球类
function Ball(el) {
    this.el = el; // 购物车位置 作为小球的起始位置
    this.taskMap = []; // 事件回调容器
    this.position = el.getBoundingClientRect(); // 球的原点
    this.dropOver = this.dropOver.bind(this); // 球运行结束回调
    this._uid = _uid++;
    console.log(this._uid + "\u53F7\u7403\u88AB\u521B\u5EFA\uFF01");
}
Ball.prototype = {
    // 初始化位置, 把球从购物车拿出 ，放置到指定位置
    beforeDrop: function (pos) {
        var _this = this;
        var x = pos.x, y = pos.y, z = pos.z;
        var _a = this.position, top = _a.top, left = _a.left;
        var offsetX = left - x;
        var offsetY = top - y;
        this.translate({ x: -offsetX, y: -offsetY }); // 1、移动小球
        this.el.style.visibility = "visible"; // 2、显示小球
        // 等待浏览器重绘完成
        setTimeout(function () {
            _this.startDrop(); // 3、开始下落
        }, 20);
    },
    startDrop: function () {
        var styleKey = "transition";
        // 内外层添加不同的transition 水平匀速，竖直方向做贝塞尔曲线过度
        this.el.style[styleKey] = "all .3s cubic-bezier(0.49, -0.29, 0.75, 0.41)";
        this.el.children[0].style[styleKey] = "all .3s linear";
        // this.translate(); // 回到原点，即回到购物车
        this.translate({ x: 2000, y: 300 });
        this.el.addEventListener("transitionend", this.dropOver); // 添加回调监听
    },
    translate: function (pos) {
        if (pos === void 0) { pos = {}; }
        var _a = pos.x, x = _a === void 0 ? 0 : _a, _b = pos.y, y = _b === void 0 ? 0 : _b, _c = pos.z, z = _c === void 0 ? 0 : _c;
        var el = this.el;
        var styleKey = "transform";
        var styleVal = "translate3d(0px," + y + "px," + z + "px)";
        el.style[styleKey] = styleVal; // y方向上运动
        el.children[0].style[styleKey] = "translate3d(" + x + "px,0px," + z + "px)"; // x方向上运动
    },
    // 结束动画回调 通知外部
    dropOver: function () {
        var _this = this;
        var styleKey = "transition";
        this.el.removeEventListener("transitionend", this.dropOver);
        this.el.style[styleKey] = "";
        this.el.children[0].style[styleKey] = "";
        setTimeout(function () {
            // 4、运动结束后 隐藏小球
            _this.el.style.visibility = "hidden";
            _this.fire("drop-over");
        });
    },
    // 监听器
    on: function (event, callback) {
        this.taskMap[event] = callback;
    },
    // 触发器
    fire: function (event) {
        this.taskMap[event] && this.taskMap[event](this);
    }
};

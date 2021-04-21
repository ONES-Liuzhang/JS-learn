var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// ts中的继承 extends
var _uid = 0;
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
        _uid++;
        this._uid = _uid;
        console.log("\u9996\u6B21\u88AB\u521B\u5EFA\uFF0C\u5927\u5BB6\u597D\uFF0C\u6211\u662F" + this._uid + "\u53F7\uFF1A " + this.name + "!");
    }
    Animal.prototype.run = function () {
        console.log(this.name + " \u6B63\u5728\u5954\u8DD1");
    };
    return Animal;
}());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(name, color) {
        var _this = _super.call(this, name) || this;
        _this.name = name;
        _this.color = color;
        return _this;
    }
    Cat.prototype.speak = function () {
        console.log(this.color + "\u7684\u732B\u8BF4\u8BDD\u4E86\uFF0C\u6211\u7684\u540D\u5B57\u662F" + this.name + " \uFF0C\u55B5\u55B5\u55B5\uFF01");
    };
    return Cat;
}(Animal));
var cat = new Cat("tiger", "黑色");
cat.run();
cat.speak();

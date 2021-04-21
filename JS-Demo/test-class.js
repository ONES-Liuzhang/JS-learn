var AClass = /** @class */ (function () {
    function AClass(name) {
        this.name = name;
    }
    AClass.prototype.push = function () {
        console.log("这是个测试函数");
    };
    return AClass;
}());

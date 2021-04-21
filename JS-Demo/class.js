var A = /** @class */ (function () {
    function A(name) {
        this.name = name;
    }
    A.prototype.say = function () {
        console.log("my name is ", this.name);
        this.run();
    };
    A.prototype.run = function () {
        console.log("run");
    };
    return A;
}());
var a = new A("a");
a.say();

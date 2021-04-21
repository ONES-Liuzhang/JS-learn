var Foo = /** @class */ (function () {
    function Foo() {
        this.a = 1;
        this.b = 2;
    }
    Object.defineProperty(Foo.prototype, "g1", {
        get: function () {
            return "get";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Foo.prototype, "s1", {
        set: function (val) {
            this.s1 = val;
        },
        enumerable: false,
        configurable: true
    });
    return Foo;
}());

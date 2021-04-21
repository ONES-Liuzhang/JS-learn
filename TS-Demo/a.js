"use strict";
var __extends =
	(this && this.__extends) ||
	(function () {
		var extendStatics = function (d, b) {
			extendStatics =
				Object.setPrototypeOf ||
				({ __proto__: [] } instanceof Array &&
					function (d, b) {
						d.__proto__ = b;
					}) ||
				function (d, b) {
					for (var p in b)
						if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
				};
			return extendStatics(d, b);
		};
		// d: Bar,  b: Foo
		return function (d, b) {
			// 1.继承静态属性
			extendStatics(d, b);
			// 2.新建一个函数，设置其constructor
			function __() {
				this.constructor = d;
			}
			d.prototype =
				b === null
					? Object.create(b)
					: ((__.prototype = b.prototype), new __());
		};
	})();
exports.__esModule = true;
var Foo = /** @class */ (function () {
	function Foo(a, b) {
		this.a = a;
		this.b = b;
	}
	Foo.prototype.run = function () {
		console.log("foo", this.a, this.b);
	};
	return Foo;
})();
var Bar = /** @class */ (function (_super) {
	__extends(Bar, _super);
	function Bar(a, b) {
		var _this = _super.call(this, a, b) || this;
		_this.c = a + b;
		return _this;
	}
	Bar.prototype.run = function () {
		console.log("bar");
	};
	return Bar;
})(Foo);
var bar = new Bar(1, 2);
bar.run();

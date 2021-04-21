function Animal(name) {
	this.name = name;
}
Animal.prototype.run = function () {
	console.log("run");
};

function Dog(name, color) {
	Animal.call(name);
	this.color = color;
}
inheritPrototype(Dog, Animal);
Dog.prototype.speak = function () {
	console.log("wang wang");
};

function inheritPrototype(child, parent) {
	function _() {
		this.constructor = child;
	}
	_.prototype = parent.prototype;
	child.prototype = new _();

	// 继承静态方法和静态变量
	// 如果运行在不支持setPrototypeOf的浏览器上需要polyfill
	Object.setPrototypeOf(child, parent);
}

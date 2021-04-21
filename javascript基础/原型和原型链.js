const { static } = require("express");

function Father() {
	let staticVar = "一个静态变量";
	this.memberVar = "这是个成员变量";
	this.name = "我是Father";
}

Father.prototype = {
	getName() {
		console.log(this.name);
	},
	coverdFn() {
		console.log("我会被Children覆盖");
	},
};

function Children() {
	this.name = "我是Child";
}

// 继承
// Chidren.prototype.__proto__ 指向 Father.prototype
// Children.prototype = Object.create(Father.prototype);

Children.prototype.coverdFn = function () {
	console.log("我取代了Father的coverd函数");
};

// 更好的设置__proto__的方式
Object.setPrototypeOf(Children.prototype, Father.prototype);

var c = new Children();
c.getName(); // 顺着原型链找到Father的getName函数 打印 我是Child
c.coverdFn(); // Chidren中拥有coverdFn，直接调用 打印 我取代了Father的coverd函数
console.log(c.memberVar);

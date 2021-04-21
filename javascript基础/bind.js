/**
 * 硬绑定 bind
 * 软绑定 softBind
 *
 * 硬绑定：
 * 通过new调用时会改变this指向
 * MDN的实现方式
 *  */
Function.prototype.selfBind = function (oThis) {
	if (typeof this !== "function") {
		return new TypeError("类型错误");
	}
	let args = Array.prototype.slice.call(arguments, 1);
	let fToBind = this;
	let fNoop = function () {};
	let bound = function () {
		return fToBind.apply(
			// 判断是否通过new关键字创建 或者通过new.target来判断
			this instanceof fNoop && oThis ? this : oThis,
			[...args, ...arguments]
		);
	};

	fNoop.prototype = this.prototype;
	bound.prototype = new fNoop();

	// 定义绑定后函数的长度和名字
	const desc = Object.getOwnPropertyDescriptors(bound);
	Object.defineProperties(bound, {
		length: desc.length,
		name: Object.assign(desc.name, {
			value: `bound ${desc.name.value}`,
		}),
	});

	return bound;
};

// TODO:: softBind 软绑定 提供一种可以改变绑定的方式
//
Function.prototype.softBind = function softBind(obj) {
	let fn = this;
	let args = Array.prototype.slice.call(arguments, 1);
	let bound = function () {
		return fn.apply(!this || this == (global || window) ? obj : this, [
			...args,
			...arguments,
		]);
	};
	bound.prototype = Object.create(fn.prototype);
	return bound;
};

// -------- 测试代码 ---------
function fn(b) {
	console.log((this.a || "undefined") + b);
}

console.group("bind测试");
let obj = {
	a: 1,
};
let obj2 = {
	a: 2,
};
let fnBound = fn.selfBind(obj);

fnBound(2); // obj.a + 2 = 1 + 2 = 3
fnBound.call(obj2, 2); // 硬绑定，再调用call和apply也无法改变内部的this obj.a + 2 = 1 + 2 = 3

// 1.new 新建一个对象instance
// 2.执行instance._proto_ = fnBound.prototype
// 3.函数调用的this绑定为instance
// 4.如果函数没有返回其他对象，则new fn()返回这个新对象
let newObj = new fnBound(2); // newObj.a + 2 = "undefined" + 2 = "undefined2"
console.groupEnd("------");

console.group("softBind 测试");
let softBind = fn.softBind(obj);
softBind(5); // obj1.a + 5 = 1 + 5 = 6
obj2.fn = softBind;
obj2.fn(5); // obj2.a + 5 = 2 + 5 = 7

console.groupEnd("------");

/**
 * new 关键字
 * 1. 创建一个空对象obj
 * 2. 空对象的__proto__指向函数的prototype
 * 3. 执行函数
 * 4. 如果函数有返回值，则返回该值，如果没有则返回obj
 */
function selfNew(fn, ...args) {
	let obj = Object.create(fn.prototype);
	let res = fn.apply(obj, args);
	return isComplexObjectType(res) ? res : obj;
}

let isComplexObjectType = (obj) =>
	(typeof obj === "function" || typeof obj === "object") && obj !== null;

function Foo() {}

let foo = selfNew(Foo);

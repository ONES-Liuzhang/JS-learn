/**
 * instanceof 检测构造函数的prototype是否出现在某个实例对象的原型链上
 * object instanceof constructor
 *
 * 注意点：
 * 1. obj instanceof constructor 如果返回true，不代表其永远是true，因为构造函数的prototype可能被修改
 * 2. 跨窗口可能导致的问题, [] instanceof window.frames[0].Array 会返回false，因为 Array.prototype !== window.iframes[0].prototype
 *
 * 报错：
 * TypeError： constructor必须是一个callable
 */
function selfInstanceof(obj, ctor) {
	if (typeof ctor !== "function")
		return new TypeError(" Right-hand side of 'instanceof' is not callable");
	let proto = Object.getPrototypeOf(obj);
	while (true) {
		if (proto == null) return false;
		if (proto === ctor.prototype) return true;
		// 循环获取下一个原型链
		proto = Object.getPrototypeOf(proto);
	}
}

// 测试
function Car() {}

let car = new Car();

console.log(selfInstanceof(car, Car));
console.log(selfInstanceof(car, Object));
console.log(selfInstanceof(car, {}));
console.log(selfInstanceof(car, function () {}));

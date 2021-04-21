/**
 * 实现对象的私有变量
 */
// 通过proxy代理的方式
function proxy(obj) {
	return new Proxy(obj, {
		get(target, key) {
			if (key.startsWith("_")) {
				return new Error(`不能直接访问私有变量${key}`);
			}
			return target[key];
		},
		ownKeys() {
			return Reflect.ownKeys(obj).filter((key) => !key.startsWith("_"));
		},
	});
}

let obj = {
	data: {},
	_data: {},
};

let p_data = proxy(obj);

// 使用闭包
const Person = (function () {
	// 利用Symbol的唯一性
	let _name = Symbol("name");
	class Person {
		constructor(name) {
			this[_name] = name;
		}
		getName() {
			return this[_name];
		}
	}
	return Person;
})();

class Person2 {
	constructor(name) {
		let _name = name;
		this.getName = function () {
			return _name;
		};
	}
}

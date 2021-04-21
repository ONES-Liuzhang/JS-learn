/**
 * Object.assign
 * 1. 只会拷贝源对象中可枚举的属性到目标对象
 * 2. String类型和Symbol类型的属性都会被拷贝
 * 3. 会调用源对象的getter和目标对象的setter，不适用于源对象通过getter获取值的复制
 * 4. 不会复制原型链
 *
 * return
 * 返回目标对象(target)
 *
 * 报错：
 * 1. 如果属性不可写，会报TypeError
 * 2. 在报错之前的属性操作是会生效的
 */
const { isComplexObject } = require("./utils");

function selfAssign(target, ...source) {
	if (target === undefined || target === null) {
		return new TypeError("Cannot convert undefined or null to object");
	}
	// assign会改变target
	let to = Object(target);
	source.reduce((accu, curr) => {
		isComplexObject(accu) || (curr = Object(curr));
		// Object.keys 只包含自身可枚举对象
		[...Object.getOwnPropertySymbols(curr), ...Object.keys(curr)].forEach(
			(k) => {
				// 浅拷贝
				accu[k] = curr[k];
			}
		);
	}, target);
	return to;
}

let obj1 = { a: 1 };
Object.defineProperty(obj1, "getTest", {
	enumerable: true,
	configurable: true,
	get() {
		return "调用getter获取的val";
	},
});

// test
console.log(selfAssign({}, obj1));
console.log(selfAssign(null, obj1));

/**
 * 实现call方法
 */
Function.prototype.selfCall = function call(context, ...args) {
	// 防止属性冲突，使用Symbol
	let caller = Symbol("caller");
	context[caller] = this;
	let res = context[caller](...args);
	// 删除属性
	delete context[caller];
	return res;
};

function fn(a) {
	this.a = a;
}

obj = {};

fn.selfCall(obj, 2);

console.log(obj.a);

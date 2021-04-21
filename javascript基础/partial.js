/**
 * 偏函数
 * 和柯里化的区别：
 * 先接收固定数量的参数，返回一个函数来接收剩下的参数
 * 偏函数的例子：bind函数
 */
function partialFunc(func, ...args) {
	return function (...args2) {
		return func(...args, ...args2);
	};
}

// TODO:: 支持占位符的写法

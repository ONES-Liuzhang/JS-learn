// 函数柯里化
// 对一个函数柯里化： 拆分它的参数，当参数不足时会返回一个函数，供继续传参，直到参数数量足够时执行函数
function curry(fn) {
	return function curryFn(...args) {
		// 如果参数足够，直接执行fn
		if (fn.length <= args.length) {
			return fn.apply(null, args);
		} else {
			// 如果参数数量不够，返回一个函数接收剩下的参数
			return (...args2) => curryFn(...args, ...args2);
		}
	};
}

function add(a, b, c) {
	return a + b + c;
}

const curryAdd = curry(add);

console.log(curryAdd(1, 2)(3));

const split = (seperator, str) => str.split(seperator);

const carriedSplit = curry(split);
console.log(carriedSplit("/")("a/2"));

// TODO:: 支持占位符的柯里化函数

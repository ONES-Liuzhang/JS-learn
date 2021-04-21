const e = require("express");

/**
 * 菲波拉契数列
 *
 */
let fibonacci = function fibonacci(n) {
	if (n < 1) return new Error("参数错误");
	if (n == 1 || n == 2) return 1;
	return fibonacci(n - 1) + fibonacci(n - 2);
};

// 缓存优化
function cache(fn) {
	let cached = Object.create(null);
	return (num) => cached[num] || (cached[num] = fn(num));
}

// 动态规划法
let fibonacci_Dp = function (n) {
	if (n < 1) return new Error("参数错误");
	if (n == 1 || n == 2) return 1;
	n = n - 2;
	let pre, curr, temp;
	pre = curr = 1;
	while (n) {
		temp = curr;
		curr = pre + curr;
		pre = temp;
		n--;
	}
	return curr;
};

// fibonacci = cache(fibonacci);
// fibonacci_Dp = cache(fibonacci_Dp);

// console.log(fibonacci(10));
// console.log(fibonacci(9));

// console.log(fibonacci_Dp(10));

// 使用自定义迭代器生成一个无限斐波拉契序列
function genFibonacci() {
	let n1 = 1,
		n2 = 1;
	let fibonacciIterator = {
		next() {
			let curr = n1;
			n1 = n2;
			n2 = n1 + curr;
			return { value: curr, done: false };
		},
		[Symbol.iterator]() {
			return this;
		},
	};
	return fibonacciIterator;
}
let fibonacciIt = genFibonacci();

// 上面的函数和下面是一一样的效果
function* genFibonacci2() {
	let n1 = 1,
		n2 = 1;
	while (true) {
		let curr = n1;
		n1 = n2;
		n2 = n1 + curr;
		yield curr;
	}
}

// 输出10000以内的斐波拉契数列
for (let n of fibonacciIt) {
	if (n < 10000) {
		console.log(n);
	} else {
		break;
	}
}

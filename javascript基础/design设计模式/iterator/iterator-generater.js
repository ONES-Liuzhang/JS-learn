/**
 * 迭代器的定义
 * 迭代器是一个对象
 * 它有 next 函数
 * 调用 next 函数会返回一个对象 { done: false, value: "xxx" }
 */
// 迭代器、生成器
// 迭代器的使用
let arr = [1, 2, 3];

// 迭代器是一个函数
let iterator = arr[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

// 生成器 generator，ES6为了生成迭代器提供的函数
function* generator() {
	yield 1;
	yield 2;
	yield 3;
}

let gen = generator();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());

// jquery 的 each 也是一个迭代器的实现

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

// 事件、异步、上下文相关
var a = 3;
function foo() {
	var a = 1;
	var b = 2;
	function innerFoo() {
		// console.log(a + b);
		// console.log(this.a);
	}

	return innerFoo;
}
var innerF = foo();

innerF();

// console.group(console.log("上下文相关"));

function* generator() {
	let a = yield 1;
	console.log(a);
	let b = yield 2;
	console.log(b);
	// return 3;
}

var gener = generator();
console.log(gener.next());
console.log(gener.next("a"));
console.log(gener.next("b"));

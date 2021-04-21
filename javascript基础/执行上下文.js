var scope = "global scope";
function checkscope() {
	var scope = "local scope";
	function f() {
		return scope;
	}
	return f;
}
checkscope()();

function checkscope2() {
	var scope = "local scope";
	function f() {
		return scope;
	}
	return f();
}
checkscope2();

// var a = "global";
// 闭包中的this指向问题
// function foo() {
// 	return function () {
// 		setTimeout(() => {
// 			console.log(this.a);
// 		});
// 	};
// }

// var bar = foo();

// obj = {
// 	bar,
// 	a: "obj",
// };

// obj.bar();

// -----
var a = "global";
let obj2 = {
	a: "obj2",
	fn: () => {
		console.log(this.a);
	},
};

obj2.fn();

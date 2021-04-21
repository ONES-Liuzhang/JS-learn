// 测试箭头函数在对象中的表现
let a = 2;
let foo = function () {
	console.log(this.a);
};
let obj = {
	a: 1,
	b() {
		return foo.call(this);
	},
};

obj.b();

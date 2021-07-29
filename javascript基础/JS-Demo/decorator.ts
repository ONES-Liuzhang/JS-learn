// decorator装饰器

// const classDecorator = (target) => {
// 	const keys = Object.getOwnPropertyNames(target.prototype);
// 	console.log(keys);
// };

// @classDecorator
// class A {
// 	sayName() {
// 		console.log("classA");
// 	}
// }

// 全局类错误处理装饰器
const asyncClass = (errHandler?: (err: Error) => void) => (target: any) => {
	Object.getOwnPropertyNames(target.prototype).forEach((key) => {
		let fn = target.prototype[key];
		target.prototype[key] = async (...args: any) => {
			try {
				await fn.apply(this, ...args);
			} catch (err) {
				errHandler && errHandler(err);
			}
		};
	});
	return target;
};

@asyncClass((err: Error) => {
	console.log("全局拦截：", err);
})
class B {
	someFunc() {
		throw new Error("一个错误");
	}
}
let bObj = new B();
bObj.someFunc();

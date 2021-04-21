class openButton {
	@funcDecorator
	onClick() {
		console.log("打开弹窗！");
	}
}

function funcDecorator(target, name, descriptor) {
	const originalFn = descriptor.value;
	const self = this;
	descriptor.value = function () {
		console.log(`装饰open按钮${name}函数`);
		return originalFn.apply(self, arguments);
	};
}

const btn = new openButton();

btn.onClick();

// 类装饰器
@classDecorator
class Modal {}

function classDecorator(target) {
	target.sayMyName = "我是通过装饰器赋值的名字!";
	return target; // 操作完后需要返回类本身
}

// 测试
console.log(Modal.sayMyName);

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _class2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	var desc = {};
	Object['ke' + 'ys'](descriptor).forEach(function (key) {
		desc[key] = descriptor[key];
	});
	desc.enumerable = !!desc.enumerable;
	desc.configurable = !!desc.configurable;

	if ('value' in desc || desc.initializer) {
		desc.writable = true;
	}

	desc = decorators.slice().reverse().reduce(function (desc, decorator) {
		return decorator(target, property, desc) || desc;
	}, desc);

	if (context && desc.initializer !== void 0) {
		desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
		desc.initializer = undefined;
	}

	if (desc.initializer === void 0) {
		Object['define' + 'Property'](target, property, desc);
		desc = null;
	}

	return desc;
}

var openButton = (_class = function () {
	function openButton() {
		_classCallCheck(this, openButton);
	}

	_createClass(openButton, [{
		key: "onClick",
		value: function onClick() {
			console.log("打开弹窗！");
		}
	}]);

	return openButton;
}(), (_applyDecoratedDescriptor(_class.prototype, "onClick", [funcDecorator], Object.getOwnPropertyDescriptor(_class.prototype, "onClick"), _class.prototype)), _class);


function funcDecorator(target, name, descriptor) {
	var originalFn = descriptor.value;
	var self = this;
	descriptor.value = function () {
		console.log("\u88C5\u9970open\u6309\u94AE" + name + "\u51FD\u6570");
		return originalFn.apply(self, arguments);
	};
}

var btn = new openButton();

btn.onClick();

// 类装饰器

var Modal = classDecorator(_class2 = function Modal() {
	_classCallCheck(this, Modal);
}) || _class2;

function classDecorator(target) {
	target.sayMyName = "我是通过装饰器赋值的名字!";
	return target; // 操作完后需要返回类本身
}

// 测试
console.log(Modal.sayMyName);

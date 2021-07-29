// AOP前置通知
Function.prototype._before = function (beforeFn) {
	let self = this;
	return async function () {
		// 先执行before
		beforeFn.apply(self, arguments);
		// 再执行原函数
		return await self.apply(self, arguments);
	};
};
// AOP后置通知
Function.prototype._after = function (afterFn) {
	let self = this;
	return async function () {
		let ret = await self.apply(self, arguments);
		afterFn.apply(self, arguments);
		return ret;
	};
};

function doSthSync() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
			console.log("函数执行ing");
		}, 3000);
	});
}

// let t1, t2;
// function doSth() {
// 	// 一些同步的复杂操作
// 	let i = 0;
// 	while (i < 10000) i++;
// }
// doSth = doSth
// 	._before(() => {
// 		t1 = +new Date();
// 		console.log("函数执行前");
// 	})
// 	._after(() => {
// 		t2 = +new Date();
// 		console.log(`函数执行完毕，耗时${t2 - t1}ms`);
// 	});

// doSth();

// let t1, t2;
// doSthSync = doSthSync
// 	._before(() => {
// 		t1 = +new Date();
// 		console.log("函数执行之前");
// 	})
// 	._after(() => {
// 		t2 = +new Date();
// 		console.log("函数执行完毕: 耗时" + (t2 - t1) + "ms");
// 	});

// doSthSync();

Function.prototype._around = function (aroundFn) {
	let self = this;
	function JoinPoint(args) {
		// 获取原函数控制权
		this.invoke = function () {
			self.apply(self, args);
		};
	}

	return function () {
		let args = [new JoinPoint(arguments)];
		aroundFn.apply(self, args);
	};
};

function doSth() {
	console.log("doSth");
}

doSth = doSth._around((descriptor) => {
	let fn = descriptor.invoke;
	let t1 = +new Date();
	// 执行原函数
	fn();
	console.log("函数执行时间：", +new Date() - t1);
});

doSth();

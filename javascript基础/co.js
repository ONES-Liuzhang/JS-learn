/**
 * 实现一个co函数
 * co函数接收一个generator
 * 1.自动执行generator
 * 2.返回一个promise
 */
function co(gen) {
	let it = gen();
	return new Promise((resolve, reject) => {
		let ret;
		let onFulfilled = function (res) {
			try {
				ret = it.next(res);
			} catch (err) {
				reject(err);
			}
			next(ret);
		};

		let next = function (ret) {
			const { done, value } = ret;
			if (done) {
				return resolve(ret.value);
			}
			return Promise.resolve(value).then(onFulfilled);
		};
		onFulfilled();
	});
}

function* generator() {
	yield 1;
	yield 2;
}

co(generator).then(() => console.log(3));

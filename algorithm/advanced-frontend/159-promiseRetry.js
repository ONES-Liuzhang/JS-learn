function retry(promiseFn, times) {
	if (times < 0) return;
	return new Promise(async (resolve, reject) => {
		while (times--) {
			try {
				await promiseFn();
				resolve(times);
				break;
			} catch (err) {
				if (times > 0) {
					continue;
				}
				reject(err);
				break;
			}
		}
	});
}

function promiseFn() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			let num = Math.random() * 10;
			if (num < 5) {
				resolve(num);
			} else {
				reject("尝试失败!");
			}
		}, 1000);
	});
}
const time = Date.now();

retry(promiseFn, 10)
	.then((res) => {
		console.log(`成功，剩余执行次数:${res}，执行耗时${Date.now() - time}`);
	})
	.catch((err) => {
		console.log("执行失败", err);
	});

function retry2(fn, times) {
	times--;
	return new Promise((resolve, reject) => {
		resolve(fn());
	})
		.then((res) => {
			return times;
		})
		.catch((err) => {
			if (times > 0) {
				return retry2(fn, times);
			}
			return Promise.reject(err);
		});
}

retry2(promiseFn, 10)
	.then((res) => {
		console.log(`成功，剩余执行次数:${res}，执行耗时${Date.now() - time}`);
	})
	.catch((err) => {
		console.log("执行失败", err);
	});

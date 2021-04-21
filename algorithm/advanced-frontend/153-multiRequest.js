// 批量请求
/**
 * 要求最大并发数 maxNum
 * 每当有一个请求返回，就留下一个空位，可以增加新的请求
 * 所有请求完成后，结果按照 urls 里面的顺序依次打出
 * @param {*} urls
 * @param {*} maxNum
 */
function multiRequests(urls, maxNums) {
	let total = urls.length;
	let results = [];
	return new Promise((resolve, reject) => {
		let currIndex = 0; // 当前待执行的下标
		let restNum = total; // 剩余未执行的数量

		// 添加初始值
		for (let i = 0; i < maxNums; i++) {
			if (i < total) {
				addRequest(request(urls[i]), i);
			}
		}

		function addRequest(req, index) {
			currIndex++;
			req
				.then((res) => {
					// 保存结果
					results[index] = res;
				})
				.finally(() => {
					restNum--;
					if (currIndex < total) {
						let req = request(urls[currIndex]);
						addRequest(req, currIndex);
					} else if (restNum == 0) {
						// 结束后发送结果
						resolve(results);
					}
				});
		}
	});
}

// 模拟request
function request(url) {
	return new Promise((resolve) => {
		let timeout = Math.random() * 1000;
		setTimeout(() => resolve(url), timeout);
	});
}

multiRequests([1, 2, 3, 4, 5, 6, 7, 8], 5).then((res) => console.log(res));

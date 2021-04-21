// 批量请求
/**
 * 要求最大并发数 maxNum
 * 每当有一个请求返回，就留下一个空位，可以增加新的请求
 * 所有请求完成后，结果按照 urls 里面的顺序依次打出
 * @param {*} urls
 * @param {*} maxNum
 */
function multiRequests(urls, maxNum) {
	let curr = 0;
	let promises = [];
	for (curr; curr < maxNum; curr++) {
		promises.push(request(urls[curr]));
	}
	urls.reduce((pre, next) => {});
}

function request(url, time = 1000) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(url);
		}, time);
	});
}

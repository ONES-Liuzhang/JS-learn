// 解析URL参数
function parseParams(url) {
	let paramStr = /.+\?(.+)/.exec(url)[1];
	let params = {};
	if (paramStr) {
		let paramArr = paramStr.split("&");
		paramArr.forEach((str) => {
			if (/=/.test(str)) {
				str = decodeURIComponent(str);
				let [key, val] = str.split("=");
				if (Object.hasOwnProperty.call(params, key)) {
					params[key] = [].concat(params[key], val);
				} else {
					params[key] = val;
				}
			} else {
				params[str] = true;
			}
		});
	}
	console.log(params);
	return params;
}

// test
// parseParams("https://juejin.cn/post/6946022649768181774#heading-5");
parseParams(
	"https://juejin.cn/post/6946022649768181774#heading-5?a=1&b=2&c=3&d&a=2&啊=aa"
);

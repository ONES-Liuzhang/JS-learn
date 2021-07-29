// 防抖：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
// 施法条
function debounce(fn, duration) {
	let timer = null;
	return function (args) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn.call(this, args);
		}, duration);
	};
}

// let deb = debounce(() => {
// 	console.log("aaa");
// }, 1000);

// deb();
// deb();
// deb();

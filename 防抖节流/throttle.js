// 节流: 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
function throttle(fn, duration) {
	let lastTime;
	let timer = null;
	return function (...args) {
		let currentTime = Date.now();
		if (!lastTime || currentTime - lastTime >= duration) {
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
			lastTime = currentTime;
			fn.call(this, args);
		} else {
			let timeout = duration - (currentTime - lastTime);
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
			timer = setTimeout(() => {
				lastTime = currentTime;
				fn.call(this, args);
			}, timeout);
		}
	};
}

// let thro = throttle(() => {
// 	console.log("aaa");
// }, 500);

// thro();
// thro();
// thro();

/**
 * 防抖 debounce
 * leading 是否在进入时立即执行一次
 * context 绑定fn的执行上下文
 */
function debounce(
	fn,
	duration,
	options = {
		leading: true,
		context: null,
	}
) {
	let timer;
	let { leading, context } = options;

	function _debounce() {
		let args = Array.prototype.slice.call(arguments);
		if (timer) {
			clearTimeout(timer);
		}

		if (leading && !timer) {
			timer = setTimeout(null);
			// 立即执行一次
			fn.apply(context, args);
		} else {
			timer = setTimeout(() => {
				fn.apply(context, args);
				timer = null;
			}, duration);
		}
	}
	// 提供给外部来中止计时器
	_debounce.cancel = function () {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
	};
	return _debounce;
}

/**
 * 节流 throttle
 */
function throttle(fn, duration) {
	let startTime, currTime;
	let timer;
	return function () {
		currTime = Date.now();

		if (!startTime || currTime - startTime >= duration) {
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
			// 更新startTime
			startTime = Date.now();
			return fn.apply(null, ...arguments);
		} else {
			let diff = duration - currTime + startTime;
			timer = setTimeout(() => {
				clearTimeout(timer);
				timer = null;
				// 更新startTime
				startTime = Date.now();
				fn.apply(null, ...arguments);
			}, diff);
		}
	};
}

// 节流: 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。
// function throttle(fn, duration) {
// 	let lastTime;
// 	let timer = null;
// 	return function (...args) {
// 		let currentTime = Date.now();
// 		if (!lastTime || currentTime - lastTime >= duration) {
// 			if (timer) {
// 				clearTimeout(timer);
// 				timer = null;
// 			}
// 			lastTime = currentTime;
// 			fn.call(this, args);
// 		} else {
// 			let timeout = duration - (currentTime - lastTime);
// 			if (timer) {
// 				clearTimeout(timer);
// 				timer = null;
// 			}
// 			timer = setTimeout(() => {
// 				lastTime = currentTime;
// 				fn.call(this, args);
// 			}, timeout);
// 		}
// 	};
// }

function throttle(fn, duration, immidiate) {
  let last = 0;
  let timer = null;
  return function () {
    const context = this;
    const now = Date.now();
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (now - last >= duration) {
      last = now;
      fn.apply(context, arguments);
    } else {
      timer = setTimeout(() => {
        last = Date.now();
        fn.apply(context, arguments);
      }, duration - (now - last));
    }
  };
}
let timer = Date.now();
function fn() {
  let now = Date.now();
  console.log(`间隔时间：${Date.now() - timer}`);
  timer = now;
}

const throttleFn = throttle(fn, 1000);

// 立即执行一次
setTimeout(throttleFn, 0);

setTimeout(throttleFn, 600);

setTimeout(throttleFn, 1400);

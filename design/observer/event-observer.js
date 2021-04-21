// 订阅-发布模式 和观察者模式有些许差别
// 观察者模式： 发布者会直接接触到订阅者
// 订阅-发布模式：发布者不直接接触订阅者，由第三方发布信息
class EventBus {
	constructor() {
		this.handler = {};
	}

	on(eventName, cb) {
		if (!this.handler[eventName]) {
			this.handler[eventName] = [];
		}
		this.handler[eventName].push(cb);
	}

	off(eventName, cb) {
		let events;
		if (!(events = this.handler[eventName])) return;
		let cbIndex = events.findIndex((fn) => fn === cb);
		if (cbIndex > -1) {
			events.splice(cbIndex, 1);
		}
	}

	once(eventName, cb) {
		let fn = () => {
			cb.apply(null, arguments);
			this.off(eventName, fn);
		};
		this.on(eventName, fn);
	}

	emit(eventName, ...args) {
		let events = this.handler[eventName];
		if (!events) return;
		for (let i = 0, j = events.length; i < j; i++) {
			let cb = events[i];
			if (cb) {
				cb(...args);
			}
		}
	}
}

// 测试
const bus = new EventBus();

bus.on("event1", () => {
	console.log("event1 触发");
});

bus.once("event1", () => {
	console.log("event2 只能触发一次");
});

bus.emit("event1");
bus.emit("event1");
bus.emit("event1");

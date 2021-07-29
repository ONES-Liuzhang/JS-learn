// 发布者类
class Publisher {
	constructor() {
		this.observer = [];
	}

	// 添加订阅者
	add(observer) {
		this.observer.push(observer);
	}

	// 移除订阅者
	remove(observer) {
		let idx = this.observer.findIndex((o) => o === observer);
		if (idx > -1) {
			this.observer.slice(idx, 1);
		}
	}

	notify() {
		// 通知所有订阅者
	}
}

// 订阅者作为被动方，基本的行为只有两个：被通知、去执行
class Observers {
	constructor() {}

	update() {
		console.log("observer.update invoked");
	}
}

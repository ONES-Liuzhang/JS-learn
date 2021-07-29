class VueClass {
	constructor(options) {
		this.data = options.data;
		// Vue的编译器会把模板template编译成render函数
		this.render = options.render;
	}
	// 更新组件，可以理解为是VueClass的渲染函数
	updateComponent() {
		// 构建VNode树(不理解VNode树没关系，不影响双向绑定理解)
		this.render();
		// ...
		// 省略挂载Dom的操作
	}
}

function observe(target) {
	if (target && typeof target !== "object") return;
	Object.keys(target).forEach((key) => {
		defineReactive(target, key, target[key]);
	});
}

function defineReactive(obj, key, val) {
	// 把每个属性都当一个项目组，每个项目组都安排一个产品经理
	let deps = new Dep();

	observe(val);
	Object.defineProperty(obj, key, {
		// 可枚举
		enumerable: true,
		// 可配置
		configurable: true,
		get() {
			// Dep.target是全局性的，值是当前正在等待入群的Watcher
			if (Dep.target) {
				deps.addSub(Dep.target);
			}
			return val;
		},
		set(value) {
			// 稍微做个简单的判断，如果值没改变，不做任何操作
			if (val === value) return;
			val = value;
			// **当该属性值被更新时，通知所有打工仔干活**
			deps.notify();
		},
	});
}

// 产品经理Dep类
class Dep {
	constructor() {
		// 创建一个群
		this.deps = [];
	}
	// 拥有拉人进群的权限, sub是一个Watcher
	addSub(sub) {
		this.deps.push(sub);
	}
	// 通知大家干活啦
	notify() {
		for (let i = 0, j = this.deps.length; i < j; i++) {
			// 这个群的每个打工仔都得干活
			this.deps[i].update();
		}
	}
}

// 苦逼程序员Watcher类
class Watcher {
	// 初始化，传入一个VueClass实例，为啥要传？打工人肯定得知道老板是谁啊，不然谁发工资？
	constructor(vm) {
		this.vm = vm;
		Dep.target = this;
		// 初始化Watcher的时候先调用一次渲染函数
		this.vm.updateComponent();
		// 添加完成，划掉这个名字
		Dep.target = null;
	}
	// 打工人开始干活
	update() {
		// 这个打工仔专门干渲染的事
		this.vm.updateComponent();
	}
}

// 开始测试
let vm = new VueClass({
	data: {
		msg: "hello 2077",
		other: "other text",
	},
	render() {
		console.log(`我拿到了this.data.msg，值为${this.data.msg}，开始生成VNode树`);
	},
});

// 监听vm.data
observe(vm.data);

// 创建vm实例的渲染Watcher,这个过程会自动开始第一次渲染
new Watcher(vm);

// 修改data的属性值 看看会发生什么吧！
vm.data.msg = "2077又跳票了";
vm.data.msg = "2077又又跳票了";
// 不会触发
vm.data.other = "other text change";

let activeInstance: any = null;

// 设置active instance
// 多个组件更新时 activeInstance来判断当前是否有Vue实例正在调用_update来更新DOM
function setActiveInstance(vm) {
	const prevActiveInstance = activeInstance;
	activeInstance = vm;
	return () => {
		activeInstance = prevActiveInstance;
	};
}

// 生命周期相关， 构建父子引用关系
export function initLifeCycle(vm) {
	const options = vm.$options;
	let parent = options.parent;

	// vm.$options.abstract 抽象组件 比如<keep-alive>
	// 判断parent是否为真正的组件
	if (parent && !options.abstract) {
		// 如果父组件是抽象组件==>寻找上级组件
		while (parent.$options.abstract && parent.$parent) {
			parent = parent.$parent;
		}
		// 如果本身不是抽象组件 添加到parent中
		parent.$children.push(vm);
	}

	vm.$parent = parent;
	vm.$root = parent ? parent.$root : vm;

	vm.$children = [];
	vm.$refs = {};

	// 初始化生命周期相关参数
	vm._watcher = null;
	vm._inactive = null;
	vm._directInactive = false;
	vm._isMounted = false;
	vm._isDestroyed = false;
	vm._isBeingDestroyed = false;
}

// _vnode: VNode 虚拟节点
// $el: Element DOM节点
// $parent: Vue
export function lifeCycleMixin(Vue) {
	Vue.prototype._update = function (vnode: any) {
		const vm = this;
		// 更新前的vnode和$el
		const prevNode = vm._vnode;
		const prevEl = vm.$el;

		// 设置当前实例
		let restoreActiveInstance = setActiveInstance(vm);
		vm._vnode = vnode;

		// __patch__ :
		if (!prevNode) {
			// 新建
			vm.$el = vm.__patch__(vm.$el, vnode, false /* removeOnly */);
		} else {
			// 更新
			vm.$el = vm.__patch__(prevNode, vnode);
		}
		// 还原activeInstance
		restoreActiveInstance();

		// 更新 $el
		if (prevEl) {
			prevEl.__vue__ = null;
		}
		if (vm.$el) {
			vm.$el.__vue__ = vm;
		}

		// TODO:: 待理解 什么是HOC => 高阶组件
		// if parent is an HOC, update its $el as well
		if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
			vm.$parent.$el = vm.$el;
		}
		// updated hook is called by the scheduler to ensure that children are
		// updated in a parent's updated hook.
	};
}

// 挂载component
export function mountComponent(vm, el: Element, hydrating?: boolean) {}

// 组件的产出是**VNode**

// 函数式组件 无状态组件
const MyFuncComponent = (props) => {
	return h(props);
};

// 有状态组件
class MyClassComponent {
	constructor() {}
	render() {}
}

function mountComponent(el, vnode) {
	let tag = vnode.tag;
	if (typeof tag === "string") {
		// 创建基本元素
		createElement(el, vnode);
	} else {
		// 创建组件
		createComponent(el, vnode);
	}

	function createElement(el, vnode) {
		const dom = document.createElement(vnode.tag);
		el.appendChild(dom);
	}

	function createComponent(el, vnode) {
		const { Ctor } = vnode.componentOptions;
		// 先实例化
		const instance = new Ctor();
		instance.$vnode = vnode;
		// 调用render，构建其内部的vnode
		let _vnode = (instance._vnode = instance.render());
		// 挂载到el元素
		mountComponent(el, _vnode);
	}
}

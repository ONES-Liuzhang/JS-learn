// js proxy
// Vue中 vm.parent 相当于 vm.$data.parent
// vm._parent 不会被代理到vm.$data._parent  要通过vm.$data._parent来获取
const hasHandler = {
	has(target, key) {
		let has = key in target;
		const isAllowed = typeof key === "string" && key.charAt(0) === "_" && !(key in target.$data);
		if (!has && !isAllowed) {
			if (key in target.$data) console.log("warnReservedPrefix");
			else console.log("warnNonPresent");
		}
		return has || !isAllowed;
	},
};

const getHandler = {
	get(target, key) {
		if (typeof key === "string" && !(key in target)) {
			// vm上没有该属性，vm.$data中却存在该属性
			if (key in target.$data) console.log("warnReservedPrefix");
			else console.log("warnNonPresent");
		}
		return target[key];
	},
};

const vueInstance = {
	$data: {
		_parent: "$data._parent", // !has !allowed
		haha: "",
	},
	_vnode: "", // has && allowed
	_parentVNode: "", // has && allowed
	$options: {}, // has
	// _parent: "",
};

let obj = {
	data: {
		name: "ceshi",
	},
};
obj = new Proxy(obj, {
	get(target, key) {
		return target["data"][key];
	},
	set(target, key, value) {
		target["data"][key] = value;
	},
});

console.log(obj.name);
console.log("name" in obj);
function proxyFn(obj, key, handler) {}

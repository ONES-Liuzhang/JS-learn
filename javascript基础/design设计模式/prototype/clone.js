// 深拷贝: 循环实现
// 循环检测/暴力破解
const _toString = Object.prototype.toString;

// 针对于对象
function deepClone(obj) {
	let root = {};
	let uniqueList = [];
	// 增加一个哑节点
	let Dummy = {
		parent: root,
		key: "root",
		data: obj,
	};
	let queue = [root];

	// 左进右出
	// data: 需要复制的对象
	// res: 目标对象
	while (queue.length) {
		let node = queue.pop();
		let { parent, key, data } = node;

		let res;
		// res指向parent[key]
		res = parent[key] = {};

		for (k in data) {
			if (data.hasOwnProperty(k)) {
				if (typeof data[k] === "object") {
					queue.push({
						parent: res,
						key: key,
						data: data[k],
					});
				} else {
					res[k] = data[k];
				}
			}
		}
	}

	return Dummy["root"];
}

let obj = {
	a: {
		a1: 1,
		a2: {
			b1: 3,
			b2: 4,
		},
	},
	c: {
		c1: 5,
		c2: 6,
	},
};

console.log(deepClone(obj));

// TODO::保留引用 / 破解循环

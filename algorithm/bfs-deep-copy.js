// 广度优先copy
function bfsCopy(obj) {
	if (typeof obj !== "object") return obj;
	let queue = [obj];
	let result = getType(obj) === "Object" ? {} : [];
	let cpQueue = [result];
	let map = new WeakMap(); // 储存对象 循环引用
	map.set(obj, result);
	while (queue.length > 0) {
		let node = queue.shift();
		let _obj = cpQueue.shift();

		for (let k in node) {
			let item = node[k];
			if (map.get(item)) {
				_obj[k] = map.get(item);
			} else {
				if (typeof item !== "object") {
					_obj[k] = item;
				} else {
					_obj[k] = getType(item) === "Object" ? {} : [];
					map.set(item, _obj[k]);
					queue.push(item);
					cpQueue.push(_obj[k]);
				}
			}
		}
	}
	return result;
}

function getType(obj) {
	return Object.prototype.toString.call(obj).slice(8, -1);
}

let a = { a: 1, b: 2, c: [1, 2, 3], d: { f: 11 } };
a.g = a;
let b = bfsCopy(a);

a.a = 3;
console.log(a, b);

// 第 162 题：实现对象的 Map 函数类似 Array.prototype.map
Object.prototype.map = function (cb) {
	let obj = {};
	for (let key in this) {
		if (this.hasOwnProperty(key)) {
			let value = cb(key, this[key]);
			obj[key] = value;
		}
	}
	return obj;
};

let obj = {
	a: 1,
	b: 2,
};
let obj2 = obj.map((key, value) => value++);

console.log(obj2);

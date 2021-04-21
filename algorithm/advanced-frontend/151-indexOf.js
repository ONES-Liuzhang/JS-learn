String.prototype.indexOf = function (search, fromIndex = 0) {
	if (fromIndex < 0) fromIndex = 0;
	if (fromIndex >= this.length) return -1;
	let str = this;
	let reg = RegExp(`(?<=.{${fromIndex}})(${search})`);
	let result = reg.exec(str);
	return result ? result.index : -1;
};

let str = "Hello world";
console.log(str.indexOf("world", 7));

Array.prototype.indexOf = function (search, fromIndex = 0) {
	const arrLen = this.length;
	if (fromIndex >= arrLen) return -1;
	if (fromIndex < 0) {
		fromIndex = arrLen + fromIndex;
	}
	for (let i = fromIndex; i < arrLen; i++) {
		if (i < 0) {
			i = 0;
			continue;
		}
		if (search == this[i]) {
			return i;
		}
	}
	return -1;
};

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.indexOf(8);

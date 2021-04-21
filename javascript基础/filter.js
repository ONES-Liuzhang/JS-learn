// 实现filter
Array.prototype.selfFilter = function filter(fn, context) {
	let arr = Array.prototype.slice.call(this);
	let filteredArr = [];
	for (let i = 0; i < arr.length; i++) {
		if (fn.call(context, arr[i], i, this)) {
			filteredArr.push(arr[i]);
		}
	}
};

// reduce实现
Array.prototype.selfFilter2 = function filter(fn, context) {
	let arr = Array.prototype.slice.call(this);
	arr.reduce((acc, curr, index) => {
		fn.call(context, curr, index, this) && acc.concat(curr);
	}, []);
};

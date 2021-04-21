// 递归实现数组扁平化
function flatten(arr, deep) {
	let res = [];
	for (let i = 0; i < arr.length; i++) {
		let child = arr[i];
		if (Array.isArray(child)) {
			res.push.apply(res, flatten(child));
		} else {
			res.push(child);
		}
	}
	return res;
}

console.log(flatten([1, 2, [3, [4, 5]]]));

// 递归实现flat
Array.prototype.selfFlat = function (depth = 1) {
	let arr = Array.prototype.slice.call(this);
	return flatten(arr, 0);

	function flatten(arr, deep) {
		if (deep == depth) {
			return arr;
		}
		let res = [];
		for (let i = 0; i < arr.length; i++) {
			let child = arr[i];
			if (Array.isArray(child)) {
				res.push.apply(res, flatten(child, ++deep));
			} else {
				res.push(child);
			}
		}
		return res;
	}
};

console.log([1, 2, [3, [4, 5]]].selfFlat(2));

// reduce实现 Array的flat方法
// depth 从0递增
Array.prototype.selfFlat2 = function (depth = 1) {
	let arr = Array.prototype.slice.call(this);

	return flatten(arr, 0);

	function flatten(arr, deep) {
		if (deep == depth) {
			return arr;
		}
		return arr.reduce((accu, curr) => {
			if (Array.isArray(curr)) {
				accu.push.apply(accu, flatten(curr, ++deep));
			} else {
				accu.push(curr);
			}
			return accu;
		}, []);
	}
};

// deep
function selfFlat(depth = 1) {
	let arr = Array.prototype.slice.call(this);
	if (depth == 0) {
		return arr;
	}
	return arr.reduce((accu, curr) => {
		if (Array.isArray(curr)) {
			accu.push.apply(accu, selfFlat.call(curr, depth - 1));
		} else {
			accu.push(curr);
		}
		return accu;
	}, []);
}

// 实现map
// 调用map后添加的元素不会被callback访问
// 如果存在的元素改变，callback调用的是引用时的元素
// 如果数组本身离散，返回相同位置为empty 通过arr.hasOwnProperty 判断
Array.prototype.selfMap = function map(fn, context) {
	// 复制一份array
	let arr = Array.prototype.slice.call(this);
	let mappedArr = [];
	for (let i = 0; i < arr.length; i++) {
		if (!Object.prototype.hasOwnProperty.call(arr, i)) continue;
		mappedArr[i] = fn.call(context, arr[i], i, this);
	}
	return mappedArr;
};

// 用reduce实现map
Array.prototype.selfMap2 = function map2(fn, context) {
	let arr = Array.prototype.slice.call(this);
	return arr.reduce((acc, curr, index) => {
		acc[index] = fn.call(context, curr, index, this);
		return acc;
	}, []);
};

// 由于存在稀疏数组，arr要保证跳过稀疏数组
Array.prototype.selfReduce = function reduce(fn, initialValue) {
	// 内部复制一份 防止外部改动arr的长度影响遍历
	let arr = Array.prototype.slice.call(this);
	let startIndex, accu;
	// 稀疏数组中 找到第一个非empty的数
	if (initialValue == undefined) {
		for (let j = 0; j < arr.length; j++) {
			if (!Object.hasOwnProperty.call(arr, j)) continue;
			startIndex = j + 1;
			accu = arr[j];
			break;
		}
	} else {
		startIndex = 1;
		accu = initialValue;
	}

	for (let i = startIndex; i < arr.length; i++) {
		if (!Object.prototype.hasOwnProperty.call(arr, i)) continue;
		accu = fn.call(null, accu, arr[i], i, this);
	}
	return accu;
};

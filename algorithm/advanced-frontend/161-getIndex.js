// 第 161 题：用最精炼的代码实现数组非零非负最小值 index
// 例如：[10,21,0,-7,35,7,9,23,18] 输出 5, 7 最小
function getIndex(arr) {
	let min = Number.MAX_VALUE;
	let minIdx = 0;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] > 0 && arr[i] < min) {
			min = arr[i];
			minIdx = i;
		}
	}
	return [minIdx, min].join(",");
}

function getIndex(arr) {
	let minIdx = -1;
	let min = arr.reduce((prev, next, currIdx) => {
		if (next < 0 || (prev > 0 && prev < next)) {
			return prev;
		} else {
			minIdx = currIdx;
			return next;
		}
	});
	return minIdx > -1 ? [minIdx, min].join(",") : -1;
}

console.log(getIndex([10, 21, 0, -7, 35, 7, 9, 23, 18]));
console.log(getIndex([-1, -2, -3]));

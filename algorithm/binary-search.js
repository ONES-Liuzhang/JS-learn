// 二分查找 递归
// arr: 有序数组
function search(arr, target) {
	if (arr.length === 0) return;
	function binarySearch(start, end, target) {
		if (start > end) return;
		let i = Math.floor((start + end) / 2);
		if (arr[i] === target) {
			return i;
		} else if (arr[i] < target) {
			return binarySearch(start, i - 1, target);
		} else {
			return binarySearch(i + 1, end, target);
		}
	}
	return binarySearch(0, arr.length - 1, target);
}

console.log(search([1, 2], 1));
console.log(search([1, 2], 0));

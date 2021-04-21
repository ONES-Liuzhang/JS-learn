function fn(...args) {}

function fn1() {
	let arr = [1, 2];
	let res = [...arr, ...[2, 3]];
	return res;
}

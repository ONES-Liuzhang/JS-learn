Array.prototype.splice = function (start, deleteCount, ...items) {
	if (start < 0) {
		start += this.length;
	}
	if (start < 0) start = 0;
	if (deleteCount == undefined) {
		deleteCount = this.length - start;
	} else if (deleteCount < 0) {
		deleteCount = 0;
	}
	const left = [].slice.call(this, 0, start);
	const deleted = [].slice.call(this, start, start + deleteCount);
	const right = [].slice.call(this, start + deleteCount);

	this.length = 0;
	this.push(...left, ...items, ...right);
	return deleted;
};

let arr = [1, 2, 3, 4, 5];
console.log(arr.splice(3));
console.log(arr);

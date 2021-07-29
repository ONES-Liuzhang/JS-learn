function foreach(obj, fn) {
	if (typeof obj !== "object") {
		obj = [obj];
	}

	if (Array.isArray(obj)) {
		for (let i = 0, j = obj.length; i < j; i++) {
			fn.call(null, obj[i], i, obj);
		}
	} else {
		for (let k in obj) {
			if (obj.hasOwnProperty(k)) {
				fn.call(null, obj[k], k, obj);
			}
		}
	}
}

foreach([1, 2, 3, 4], (value, index, obj) => {
	console.log(value, index);
});

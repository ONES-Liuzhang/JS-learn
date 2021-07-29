function* generator() {
	let a = yield fn();
	// let b = yield fn();
	// let c = yield fn();
	console.log(a);
}

function genToAsync(generator) {
	let gen = generator();
	Promise.resolve(gen.next().value).then((res) => {
		gen.next(res);
	});
}

function fn() {
	let timeout = 1000 * Math.random();
	let res = Math.random();
	return new Promise((resolve) => {
		setTimeout(() => resolve(res), timeout);
	});
}

genToAsync(generator);

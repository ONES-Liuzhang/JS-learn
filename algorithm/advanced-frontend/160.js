const list = [1, 2, 3];
const square = (num) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(num * num);
		}, 1000);
	});
};

// function test() {
// 	list.forEach(async (x) => {
// 		const res = await square(x);
// 		console.log(res);
// 	});
// }

function test() {
	list.reduce(async (_, next) => {
		await _;
		const result = await square(next);
		console.log(result);
	}, Promise.resolve());
}

function test() {
	let promise = Promise.resolve();
	list.forEach((num) => {
		promise = promise.then((res) => {
			console.log(res);
			return square(num);
		});
	});
	promise.then((res) => console.log(res));
}
test();

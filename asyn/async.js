// async function asyncFunc() {
// 	let str = await new Promise((resolve) => {
// 		setTimeout(() => {
// 			resolve("asyncFunc");
// 		}, 3000);
// 	});
// 	console.log(str);
// }

// asyncFunc();

function* generator() {
	let str = yield new Promise((resolve) => {
		setTimeout(() => {
			resolve("asyncFunc");
		}, 3000);
	});
	console.log(str);
	yield 2333;
}

function generatorToAsync(fn) {
	let gen = fn();
	let done = false;
	if (!done) {
		Promise.resolve(gen.next().value).then((res) => {
			done = gen.next(res).done;
		});
	}
}

generatorToAsync(generator);

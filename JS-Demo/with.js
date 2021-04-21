let obj = {
	a: 1,
	b: 2,
};

const hasHandler = {
	has(target, value) {
		console.log("target", target);
		console.log("value", value);
		return true;
	},
};

obj._proxy = new Proxy(obj, hasHandler);

with (obj._proxy) {
	a;
}

"a" in obj._proxy;

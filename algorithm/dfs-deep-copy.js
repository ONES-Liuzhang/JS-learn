function dfsCopy(obj) {
	let dummy = [obj];
	let cache = new WeakMap();
	return dfs(dummy, 0, cache);
}

// 深度遍历copy
function dfs(obj, k, cache) {
	if (typeof obj[k] !== "object") return obj[k];
	let from = obj[k];
	let to = getType(from) === "Object" ? {} : [];
	cache.set(from, to);
	for (let i in from) {
		if (from.hasOwnProperty(i)) {
			to[i] = cache.get(from[i]) ? cache.get(from[i]) : dfs(from, i);
		}
	}
	return to;
}

function getType(obj) {
	return Object.prototype.toString.call(obj).slice(8, -1);
}

let a = { a: 1, b: 2 };
let b = dfsCopy(a);

a.a = 3;
console.log(a);
console.log(b);

// 最近最少使用缓存策略
function LRUCache(max) {
	this.caches = new Map();
	this.max = max;
}

LRUCache.prototype.get = function (key) {
	return this.caches.get(key) || -1;
};

LRUCache.prototype.put = function (key, value) {
	let { caches, max } = this;
	let cache = caches[key];
	if (cache) {
		caches.delete(key);
		caches.set(key, cache);
	} else {
		if (caches.size >= max) {
			caches.delete(caches.keys().next().value);
			caches.set(key, value);
		} else {
			caches.set(key, value);
		}
	}
};

function remove(keys, key) {
	let idx = keys.indexOf(key);
	keys.splice(idx, 1);
}

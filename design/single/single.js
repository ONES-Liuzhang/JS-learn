// 单例模式
// 实现Storage，使得该对象为单例，基于 localStorage 进行封装。
// 实现方法 setItem(key,value) 和 getItem(key)。
function Storage() {}

Storage.getInstance = (function () {
	let instance;
	return function () {
		if (!instance) {
			instance = new Storage();
		}
		return instance;
	};
})();

Storage.prototype.setItem = function (key, value) {
	return localStorage.setItem(key, value);
};

Storage.prototype.getItem = function (key) {
	return localStorage.getItem(key);
};

var __spreadArrays =
	(this && this.__spreadArrays) ||
	function () {
		for (var s = 0, i = 0, il = arguments.length; i < il; i++)
			s += arguments[i].length;
		for (var r = Array(s), k = 0, i = 0; i < il; i++)
			for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
				r[k] = a[j];
		return r;
	};
function fn() {
	var args = [];
	for (var _i = 0; _i < arguments.length; _i++) {
		args[_i] = arguments[_i];
	}
}
function fn1() {
	var arr = [1, 2];
	var res = __spreadArrays(arr, [2, 3]);
	return res;
}

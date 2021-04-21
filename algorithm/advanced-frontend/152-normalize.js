// 字符串仅由小写字母和 [] 组成，且字符串不会包含多余的空格。
// 示例一: 'abc' --> {value: 'abc'}
// 示例二：'[abc[bcd[def]]]' --> {value: 'abc', children: {value: 'bcd', children: {value: 'def'}}}
function normalize(str) {
	let arr = str.split(/[\[\]\s]+/).filter(Boolean);
	let result = {};
	arr.reduce((pre, next) => (pre.children = { value: next }), result);
	return result.children;
}

let str = "[abc[bcd[def]]]";
let result = normalize(str);
console.log(result);

let str2 = "abcc";
console.log(normalize(str2));

function normalize(str) {
	let s = str.replaceAll("]", "");
	let arr = s.split("[");
	let result = {};
	arr.reduce((prev, next) => {
		prev.children = { value: next };
		return prev.children;
	}, result);
	return result.children;
}

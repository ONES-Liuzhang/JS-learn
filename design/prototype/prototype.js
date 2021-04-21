// 面试常考：模拟JAVA中的克隆接口； Javascript实现原型模式  => 实际考察深拷贝
function deepClone(obj) {
	if (Array.isArray(obj)) {
		let newArr = [];
		for (let i = 0; i < obj.length; i++) {
			newArr.push(deepClone(obj[i]));
		}
		return newArr;
	} else if (typeof obj === "object" && typeof obj !== "function") {
		let newObj = {};
		for (key in obj) {
			if (obj.hasOwnProperty(key)) {
				newObj[key] = deepClone(obj[key]);
			}
		}
		return newObj;
	} else {
		return obj;
	}
}

let arr = [1, 2, 3, [4, 5]];
let arrCopy = deepClone(arr);
arrCopy[0] = 0;
console.log(arr);

let obj = {
	a: "1",
	b: "2",
	c: {
		c1: "3",
	},
};
let objCopy = deepClone(obj);

objCopy.c = 3;
console.log(obj);

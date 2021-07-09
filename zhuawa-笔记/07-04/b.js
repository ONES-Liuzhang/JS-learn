// 运行-> 结论：CMJ规范是值拷贝
const { age, obj, setAge } = require("./a.js");

console.log(age); // 18

setAge(20);

console.log(age); // 18

console.log(obj.height); // 180

obj.hight = 200;

console.log(obj.height); // 180

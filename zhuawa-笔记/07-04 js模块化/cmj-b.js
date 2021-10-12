exports.b = true;

const a = require("./cmj-a.js"); // 循环引入 直接返回true

exports.b = false;

console.log("引入a的值为:", a);

exports.a = true;

const b = require("./cmj-b.js"); // 拿到返回的b值为false

console.log("引入b的值为:", b);

exports.a = false;

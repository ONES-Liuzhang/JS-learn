const path = require("path");

// join只是简单的拼接 并且不会去除尾部的斜杠
const joinPath = path.join(__dirname, "./text.txt/");
const joinPath1 = path.join("a", "b");

// resolve 会以当前node运行路径path.cwd()为基准解析路径，一般情况下都使用resolve来解析路径
const resolvePath = path.resolve(__dirname, "./text.txt");
const resolvePath1 = path.resolve("a", "b");

console.log(process.cwd());
console.log(joinPath);
console.log(resolvePath);

console.log(joinPath1);
console.log(resolvePath1);

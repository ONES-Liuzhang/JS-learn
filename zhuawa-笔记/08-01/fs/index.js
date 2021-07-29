const path = require("path");

const joinPath = path.join(__dirname, "./text.txt");

const resolvePath = path.resolve(__dirname, "./text.txt");

console.log(joinPath);
console.log(resolvePath);

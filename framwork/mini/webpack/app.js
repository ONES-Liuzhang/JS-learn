const a = require("./js/moduleA.js");
const b = require("./js/moduleB.js");
require("./css/index.css");

console.log(a);
console.log(b);

module.exports = a + b;

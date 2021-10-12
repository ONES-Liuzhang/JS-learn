import { a } from "./es6-a.js";
import { b } from "./es6-b.js";

console.log("a=", a);
console.log("b=", b);

// 验证export的值是引用
setTimeout(() => {
  console.log("1s后 a=", a);
  console.log("1s后 b=", b);
}, 1000);

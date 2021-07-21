import { fnB } from "./es6-b.js";

export let a = true;

export const fnA = () => {
  console.log("我是fnA");
};

// 循环引用可以返回正确值
fnB();

setTimeout(() => {
  a = false;
}, 500);

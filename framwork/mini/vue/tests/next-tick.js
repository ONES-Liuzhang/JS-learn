import { nextTick } from "../utils/next-tick.js";

// 已经开启了一个微任务A
nextTick(() => {
  console.log(2);
});

// 开启了微任务B
Promise.resolve().then(() => {
  console.log(5);
});

// 把cb加入到微任务A中
nextTick(() => {
  console.log(3);
});

// 开启了微任务C
Promise.resolve().then(() => {
  console.log(6);
});

nextTick().then(() => {
  console.log(4);
});

console.log(1);

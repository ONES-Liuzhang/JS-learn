/**
 * check 和 timer 的关系实验
 */
let time = Date.now();
const startTime = Date.now();

// check 阶段 setImmediate 的回调队列是异步执行的
// check queue 是同步执行的，setImmediate1 执行完之后才会执行 setImmediate2，在 check 阶段一共会被阻塞 200ms
setImmediate(() => {
  console.log("setImmediate1 start", Date.now() - startTime);
  time = Date.now();
  while (Date.now() - time < 50) {
    // 阻塞 50ms
  }
  console.log("setImmediate1 end 执行时间：", Date.now() - time); // 50 左右
});

setImmediate(() => {
  console.log("setImmediate2 start", Date.now() - startTime);
  time = Date.now();
  while (Date.now() - time < 150) {
    // 阻塞 150ms
  }
  console.log("setImmediate2 end 执行时间：", Date.now() - time);
});

// timer 阶段
setTimeout(() => {
  time = Date.now();
  console.log("setTimeout1 start ", Date.now() - startTime);
  while (Date.now() - time < 200) {
    // 阻塞 200ms
  }
  console.log("setTimeout1 end 执行时间：", Date.now() - time);
}, 100);

setTimeout(() => {
  time = Date.now();
  console.log("setTimeout2 start", Date.now() - startTime);
}, 350);

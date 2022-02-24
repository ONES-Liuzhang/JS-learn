async function async1() {
  console.log("async1 start"); // 2
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2"); // 3
}
console.log("script start"); // 1

// 开启事件循环
setTimeout(function () {
  console.log("setTimeout0");
  setTimeout(function () {
    console.log("setTimeout1");
  }, 0); // 8
  setImmediate(() => console.log("setImmediate")); // 7
}, 0);

process.nextTick(() => console.log("nextTick"));
async1();
new Promise(function (resolve) {
  console.log("promise1"); // 4
  resolve();
  console.log("promise2"); // 5
}).then(function () {
  console.log("promise3");
});

process.nextTick(() => console.log("nextTick2"));

console.log("script end"); // 6

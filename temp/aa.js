// 输出 2
// function a() {
//   console.log(runner);
// }
// const runner = 2;

// a();

// 先执行 finally 后输出 break
function fn() {
  try {
    return "break";
  } finally {
    console.log(123);
  }
}

console.log(fn()); // 123 break

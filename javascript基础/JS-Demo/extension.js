// JS的异常处理
function fetch(handleError, callback) {
  setTimeout(() => {
    handleError("请求失败");
  });
}

fetch(
  () => {
    console.log("失败处理"); // 失败处理
  },
  (error) => {
    console.log("请求处理"); // 永远不会执行
  }
);

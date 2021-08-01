const fs = require("fs");
// 通常搭配 path 一起食用
const path = require("path");

const filePath = path.resolve(__dirname, "./test.txt");

/** 异步操作最后一个参数都为一个回调，回调函数都第一个参数为err，第二个参数才是获取到到数据result */
fs.readFile(filePath, "utf-8", function (err, result) {
  if (!err) {
    // 默认返回二进制 第二个参数可以传入编码格式
    // "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "base64url" | "latin1" | "binary" | "hex";
    console.log(result);
  } else {
    console.error("error", err);
  }
});

// 同步方法
const result = fs.readFileSync(filePath, "utf-8");
console.log("sync", result);

// 把异步文件读取 转化为Promise
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      args.push(function cb(err, result) {
        if (!err) resolve(result);
        else reject(err);
      });
      fn.apply(fn, args);
    });
  };
}

const readFile = promisify(fs.readFile);

readFile(filePath, "utf-8").then(
  (res) => {
    console.log("prosify", res);
  },
  (err) => {
    console.error(err);
  }
);

const path = require("path");
const vm = require("vm"); // 运行时连接v8的内置模块， eval是js-core提供的
const fs = require("fs");

const content = fs.readFileSync(path.resolve(__dirname, "index.js"), "utf-8");

const script = new vm.Script(content, {
  filename: "index.js",
});

script.runInThisContext();

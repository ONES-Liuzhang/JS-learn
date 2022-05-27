const Module = require("module");

const fn = Module._extensions[".js"];

Module._extensions[".ts"] = function (module, filename) {
  console.log("这里可以做babel的解析！");
  fn.apply(fn, [module, filename]);
};

require("./a");

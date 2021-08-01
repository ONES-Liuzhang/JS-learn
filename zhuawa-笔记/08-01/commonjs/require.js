const path = require("path");
const vm = require("vm");
const fs = require("fs");

const __mg_require__ = function (filename) {
  const filePath = path.resolve(__dirname, filename);
  const content = fs.readFileSync(filePath, "utf-8");

  const template = [
    "(function(__mg_require__, __module__, __exports__){",
    "})",
  ];

  const wrapperContent = template[0] + content + template[1];

  const script = new vm.Script(wrapperContent, {
    filename: "index.js",
  });

  const module = {
    exports: {},
  };

  const result = script.runInThisContext();

  result(__mg_require__, module, module.exports);

  return module.exports;
};

const e = __mg_require__("./index.js");

console.log(e);

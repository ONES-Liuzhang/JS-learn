const path = require("path");
const vm = require("vm");
const fs = require("fs");

const content = fs.readFileSync(path.resolve(__dirname, "index.js"), "utf-8");

const script = new vm.Script(content, {
  filename: "index.js",
});

script.runInThisContext();

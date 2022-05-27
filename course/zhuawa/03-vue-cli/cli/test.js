#!/usr/bin/env node
const child_process = require("child_process");

child_process.execSync("npm i", {
  stdio: "inherit",
  env: {},
});

const { spawn } = require("promisify-child-process");

const path = require("path");
const cwd = path.resolve(__dirname);

async function test() {
  const { stdout, stderr } = await spawn("ls", ["-lh"], {
    encoding: "utf-8",
    cwd,
  });
  console.log(stderr);
}

test();

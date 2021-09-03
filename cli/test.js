const { spawn, execFileSync, execFile } = require("child_process");
const path = require("path");
const cwd = path.resolve(__dirname);
const ls = spawn("ls", ["-lh"], {
  cwd,
});

ls.stdout.pipe(process.stdout);

ls.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on("data", (data) => {
  console.error(`stderr: ${data}`);
});

ls.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});

const resultSync = execFileSync(path.resolve(__dirname, "a.js"));
// result.stdout.pipe(process.stdout);
process.stdout.write(resultSync);

const result = execFile(path.resolve(__dirname, "a.js"));

result.stdout.pipe(process.stdout);

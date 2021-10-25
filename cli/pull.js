const { spawnSync, execSync, exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const cwd = path.resolve(__dirname);

/** 拉取代码
 * @param {string} url git仓库地址
 * @param {string} dirname 要存放的文件名
 */
function getCodeFromGit(url, dirname) {
  try {
    if (!validatePath(dirname)) {
      return console.log(
        `传入的路径${dirname}不允许，不允许在${cwd}文件夹之外进行操作`
      );
    }

    const absDir = path.resolve(cwd, dirname);

    if (fs.existsSync(absDir)) {
      execSync(`rm -rf ${absDir}`);
    }
    execWithCwd(`git config --unset http.proxy`);
    const result = execWithCwd(`git clone ${url} ${absDir} --progress`);

    if (result.status === 0) {
      console.log("成功拉取代码！");

      if (execWithCwd(`cd ${absDir} && npm i`).status === 0)
        console.log("成功安装依赖！");
      // TODO:: 执行Cypress test
      execWithCwd(`cy2 `);
    } else {
      console.log(`拉取代码失败，错误码 ${result.status}`);
    }
  } catch (err) {
    console.log(err);
  }
}

/** 只允许操作当前文件夹，避免误删服务器文件 */
function validatePath(path) {
  let reg1 = /^[\/]/;
  let reg2 = /\.\.\//g;
  if (reg1.test(path) || reg2.test(path)) return false;
  return true;
}

/** 同步执行命令 */
function execWithCwd(command) {
  console.log(`开始执行 ${command}`);
  return spawnSync(command, {
    shell: true,
    cwd,
    stdio: "inherit",
  });
}

getCodeFromGit("https://github.com/mkolp11597753/empty.git", "./test");

module.exports = {
  getCodeFromGit,
};

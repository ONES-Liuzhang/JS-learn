伪代码;

class Compiler {
  constructor(options) {
    this.root = process.cwd();
    this.options = options;
    this.entryPath = options.entryPath || "main.js";
    this.modules = [];
  }

  run() {
    this.buildModule(modulePath);
  }

  // 加载入口模块
  buildModule(modulePath) {
    // 1.获取文件源码 -> 使用对应的 loader 进行操作
    const source = this._getSource(modulePath);

    // 2.替换掉 require 生成新代码，并获取当前文件的依赖 dependencies 路径
    const { sourceCode, dependencies } = this.parse(source);

    this.modules[modulePath] = sourceCode;

    // 3.递归加载
    dependencies.forEach((depPath) => {
      this.buildModule(depPath);
    });
  }
}

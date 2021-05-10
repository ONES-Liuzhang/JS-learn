const path = require("path");
const fs = require("fs");
const parser = require("@babel/parser"); // 把代码解析为AST
const t = require("@babel/types"); // 替换AST的内容
const traverse = require("@babel/traverse").default; // 遍历AST树
const generator = require("@babel/generator").default; // 根据AST生成代码
const ejs = require("ejs");

class Compiler {
  constructor(options) {
    // webpack 配置
    this.root = __dirname;
    this.options = options;
    this.modules = [];
    this.entryPath = "";
  }

  emit() {
    const { modules, entryPath, options } = this;
    const outputPath = path.resolve(this.root, options.output.path);
    const filename = options.output.filename;
    // 创建文件夹
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath);
    }

    // 把modules和entryPath注入到模板中
    ejs
      .renderFile(path.join(__dirname, "./lib/template.ejs"), {
        modules,
        entryPath,
      })
      .then((code) => {
        fs.writeFileSync(path.join(outputPath, filename), code);
      });
  }

  /**
   * 把源码中的require替换为__webpack_require__
   * @param {*} source 源码
   * @param {*} dirname 当前文件所在路径
   * @returns
   */
  parse(source, dirname) {
    // 生成ast树
    let ast = parser.parse(source);
    // 模块依赖列表
    let dependencies = [];

    // 遍历ast节点
    traverse(ast, {
      CallExpression(p) {
        const node = p.node;

        if (node.callee.name === "require") {
          // 函数名替换
          node.callee.name = "__webpack_require__";
          let modulePath = node.arguments[0].value;

          // 检查后缀
          if (!path.extname(modulePath)) {
            throw new Error(`没有找到文件${modulePath}, 请检查后缀是否正确`);
          }

          // 以当前文件路径为根路径，拼接path
          modulePath =
            "./" + path.join(dirname, modulePath).replace(/\\/g, "/");
          // TODO:: @babel/types 替换AST内容
          node.arguments = [t.stringLiteral(modulePath)];
          // 保留该模块的依赖项
          dependencies.push(modulePath);
        }
      },
    });

    // 生成新的代码
    let sourceCode = generator(ast).code;

    return {
      sourceCode,
      dependencies,
    };
  }

  /**
   *
   * @param {*} modulePath 模块绝对路径
   * @param {*} isEntry 是否为入口模块
   */
  buildModule(modulePath, isEntry) {
    const source = this._getSource(modulePath);
    // 模块相对于root的路径
    const moduleName =
      "./" + path.relative(this.root, modulePath).replace(/\//g, "/");

    if (isEntry) {
      this.entryPath = moduleName;
    }

    // 生成新代码
    const { sourceCode, dependencies } = this.parse(
      source,
      path.dirname(moduleName)
    );

    // 保存module代码
    this.modules[moduleName] = JSON.stringify(sourceCode);

    // 递归保存所有模块
    dependencies.forEach((d) => {
      this.buildModule(path.join(this.root, d), false);
    });
  }

  run() {
    const { entry } = this.options;
    const absEntryPath = path.resolve(this.root, entry);
    this.buildModule(absEntryPath, true);
    this.emit();
  }

  /**
   * 获取模块源码
   * @param {*} modulePath 模块绝对路径
   */
  _getSource(modulePath) {
    return fs.readFileSync(modulePath, "utf-8");
  }
}

module.exports = Compiler;

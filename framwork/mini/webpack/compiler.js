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
          // @babel/types 替换AST内容，替换依赖路径为相对于root的路径
          node.arguments = [t.stringLiteral(modulePath)];
          // 保留该模块的路径
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

    // 收集依赖：
    // 递归读取依赖文件，获取所有模块路径 保存在modules中
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
    try {
      const { options } = this;
      const rules = options.modules.rules;
      let content = fs.readFileSync(modulePath, "utf-8");

      for (let i = 0; i < rules.length; i++) {
        const { test, use } = rules[i];

        // 找到匹配的第一条规则
        if (test.test(modulePath)) {
          // 链式调用use中的loader
          let len = use.length - 1;
          while (len >= 0) {
            const loader = require(use[len--]);
            content = loader(content);
          }
          return content;
        }
      }
      return content;
    } catch (err) {
      throw new Error(`解析文件${modulePath}出错！`);
    }
  }
}

module.exports = Compiler;

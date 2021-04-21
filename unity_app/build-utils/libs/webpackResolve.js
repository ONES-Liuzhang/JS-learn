const webpack = require("webpack");
const resolveApp = require("./resolveApp");
module.exports = function(mStr) {
  return {
    alias: {
      // 也可以在给定对象的键后的末尾添加 $，以表示精准匹配：
      // xyz$: path.resolve(__dirname, "path/to/file.js")
    },

    // 指定一个字段，例如 browser，根据此规范进行解析。默认：["browser"]
    // aliasFields: ["browser"],

    // 用于描述的 JSON 文件。默认：["package.json"]
    descriptionFiles: ["package.json"],

    // 当从 npm 包中导入模块时（例如，import * as D3 from "d3"），此选项将决定在 package.json 中使用哪个字段导入模块。
    // 根据 webpack 配置中指定的 target 不同，默认值也会有所不同。
    // 当 target 属性设置为 webworker, web 或者没有指定，默认值为：["browser", "module", "main"]
    // 对于其他任意的 target（包括 node），默认值为： ["module", "main"]
    mainFields: ["browser", "module", "main"],

    // 如果是 true，将不允许无扩展名(extension-less)文件。
    // 默认如果 ./foo 有 .js 扩展，require('./foo') 可以正常运行。
    // 但如果启用此选项，只有 require('./foo.js') 能够正常工作。默认：false
    enforceExtension: false,

    //对模块是否需要使用的扩展（例如 loader）。默认：false
    enforceModuleExtension: false,

    // 自动解析确定的扩展。默认值为： [".js", ".json"]
    extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],

    // 解析目录时要使用的文件名。默认：["index"]
    mainFiles: ["index"],

    // 告诉 webpack 解析模块时应该搜索的目录。默认 ["node_modules"]
    // 绝对路径和相对路径都能使用，但是要知道它们之间有一点差异。
    // 通过查看当前目录以及祖先路径（即 ./node_modules, ../node_modules 等等），相对路径将类似于 Node 查找 'node_modules' 的方式进行查找。
    // 使用绝对路径，将只在给定目录中搜索。
    modules: [
      "node_modules",
      resolveApp("node_modules"),
      resolveApp("packages")
    ],

    // 启用，会主动缓存模块，但并不安全。(regex|array|boolean)传递 true 将缓存一切。默认：true
    unsafeCache: /node_modules/,

    //决定请求是否应该被缓存的函数。函数传入一个带有 path 和 request 属性的对象。默认： function() { return true }
    cachePredicate: function(path, request) {
      return true;
    },

    // 应该使用的额外的解析插件列表。它允许插件，如 DirectoryNamedWebpackPlugin。
    // plugins:[],

    // 是否将符号链接(symlink)解析到它们的符号链接位置(symlink location)。默认：
    // 启用时，符号链接(symlink)的资源，将解析为其_真实_路径，而不是其符号链接(symlink)位置。
    // 注意，当使用符号链接 package 包工具时（如 npm link），可能会导致模块解析失败。
    symlinks: true
  };
};

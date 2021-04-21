const webpack = require("webpack");

module.exports = function(mStr) {
  if (!mStr)
    throw new Error("webpack config 获取module 没有指定模块名称  mStr");
  return [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    // 用于强制所有模块的完整路径必需与磁盘上实际路径的确切大小写相匹配
    new (require("case-sensitive-paths-webpack-plugin"))(),
    // 识别某些类型的 webpack 错误并整理，以提供开发人员更好的体验。
    new (require("friendly-errors-webpack-plugin"))({
      onErrors: function(severity, errors) {
        // You can listen to errors transformed and prioritized by the plugin
        // severity can be 'error' or 'warning'
      },
      additionalTransformers: [],
      additionalFormatters: []
    }),
    // 将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件
    new (require("mini-css-extract-plugin"))({
      filename: "[name]/index.[contenthash:8].css",
      chunkFilename: "[name]/index.[contenthash:8].css"
    }),
    // 用于在 webpack 构建期间优化、最小化 CSS文件
    new (require("optimize-css-assets-webpack-plugin"))({
      sourceMap: false,
      cssnanoOptions: {
        preset: [
          "default",
          {
            mergeLonghand: false,
            cssDeclarationSorter: false
          }
        ]
      }
    }),
    // webpack 内置插件，用于根据模块的相对路径生成 hash 作为模块 id, 一般用于生产环境
    new webpack.HashedModuleIdsPlugin({
      hashDigest: "hex" //在生成 hash 时使用的编码方式，默认为 'base64'。支持 Node.js hash.digest 的所有编码。
    }),

    // new webpack.NamedChunksPlugin(function() {}),
    // 与ts-loader配合使用一起检查ts文件
    new (require("fork-ts-checker-webpack-plugin"))({
      vue: true,
      tslint: false,
      formatter: "codeframe", // 默认情况下使用默认格式化程序。 还可以将自己的格式化程序作为函数传递
      checkSyntacticErrors: true // 则将确保插件检查语法错误和语义错误。 默认情况下，该插件仅检查语义错误。 这是因为当在transpileOnly模式下使用ts-loader时，ts-loader仍会报告语法错误。 在happyPackMode中使用时不使用。 默认值：false。
    })
  ];
};

const webpack = require("webpack");
const resolveApp = require("./resolveApp");

module.exports = function(mStr) {
  return {
    path: resolveApp("public"),
    filename: `${mStr}/index.[contenthash:8].js`,
    chunkFilename: "[name]/index.[contenthash:8].js",

    // 配置如何暴露 library。可以使用下面的选项中的任意一个。
    // 注意，此选项与分配给 output.library 的值一同使用。
    // 对于下面的所有示例，都假定将 output.library 的值配置为 MyLibrary。
    libraryTarget: "var",
    library: `__dll_${mStr}`
  };
};

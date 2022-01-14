const path = require("path");
require("webpack");
module.exports = {
  configureWebpack: {
    entry: path.resolve(__dirname, "src/main.ts"),
    resolve: {
      extensions: [".vue", ".ts", ".js"],
      alias: {
        vue$: "vue/dist/vue.runtime.common.js",
      },
    },
    optimization: {
      minimize: false,
    },
  },
};

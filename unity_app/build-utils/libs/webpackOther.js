const webpack = require("webpack");
const resolveApp = require("./resolveApp");
module.exports = function(mStr) {
  return {
    mode: "production",

    devtool: false,
    context: resolveApp(""),
    externals: { vue: "Vue" },
    // 主入口
    entry: {
      [mStr]: [resolveApp(`packages/${mStr}`)]
    },
    node: {
      setImmediate: false,
      process: "mock",
      dgram: "empty",
      fs: "empty",
      net: "empty",
      tls: "empty",
      child_process: "empty"
    }
  };
};

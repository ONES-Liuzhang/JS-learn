const rimraf = require("rimraf");
const path = require("path");
const resolveApp = require("./resolveApp");

module.exports = (webpackConfig, mStr, cb) => {
  //   let mStr = webpackConfig.mStr;
  //   if (!mStr) throw new Error("webapck配置没有指定 mStr 模块名称");
  rimraf(resolveApp(`public/${mStr}`), function(err) {
    if (err) throw err;
    const {
      log,
      done,
      //   info,
      logWithSpinner,
      stopSpinner
    } = require("@vue/cli-shared-utils");
    const formatStats = require("@vue/cli-service/lib/commands/build/formatStats");
    const compiler = require("webpack")(webpackConfig);
    log();
    logWithSpinner(`Building for ${mStr} ...`);
    compiler.run((err, stats) => {
      stopSpinner(false);
      if (err) {
        throw err;
      }
      log(formatStats(stats, resolveApp(`public`), path));
      done(`Build complete. Watching for changes...`);
      cb && cb();
    });
  });
};

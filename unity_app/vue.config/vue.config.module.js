// const fs = require('fs');
const resolveApp = require('./resolveApp')
const webpack = require('webpack')

const { build_m } = process.env

const libname = `__dll_${build_m}` // 输出的变量名称

module.exports = {
  publicPath: `${build_m}/`,
  outputDir: resolveApp(`packages/${build_m}/dist`),
  chainWebpack: config => {
    // 输出配置
    config.output
      .library(libname)
      .filename(`[name].[contenthash:8].js`)
      .chunkFilename(`[name]/index.[contenthash:8].js`)
      .end();
    // 入口文件配置
    config
      .entry('app')
      .clear()
      .add(resolveApp(`packages/${build_m}`))
      .end();

    // 清除不用的插件
    config.plugins.delete('html').end();
    config.plugins.delete('copy').end();

    // 添加dll插件配置
    config
      .plugin('dll-plugin')
      .use(webpack.DllPlugin)
      .tap(options => {
        options[0] = {
          name: libname,
          path: resolveApp(`packages/${build_m}/dist/manifest.json`)
        };
        return options;
      })
      .end();

    config.optimization
      .namedChunks(true)
      .namedModules(true)
      .end();

  },

};

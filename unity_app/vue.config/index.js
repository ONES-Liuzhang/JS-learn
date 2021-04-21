// const path = require('path');
// const webpack = require('webpack');
// const fs = require('fs');
const resolveApp = require('./resolveApp');
const isDev = process.env.NODE_ENV === 'development';
const isPro = process.env.NODE_ENV === 'production';
// eslint-disable-next-line
// console.log('module.exports =');

const configs = [require('./vue.config.base')];

if (isDev) {
  configs.push(require('./vue.config.dev'));
}
if (isPro) {

  // configs.push(require(resolveApp(`packages/app/vue.config.js`)));

  // 读取参数中的模块字符串
  const build_m = (() => {
    const configArgv = JSON.parse(process.env.npm_config_argv);
    const args = configArgv.original.slice(2);
    let mIndex = args.indexOf('-m');
    let m = args[mIndex + 1] || '';
    if (mIndex >= 0 && m) {
      process.env.build_m = m;
      console.log('// 编译模块', m);
    }
    return m;
  })();

  if (build_m) {
    configs.push(require('./vue.config.module'));
    configs.push(require(resolveApp(`packages/${build_m}/vue.config.js`)));
  } else {
    configs.push(require('./vue.config.pro'));
    // configs.push(require(resolveApp(`packages/app/vue.config.js`)));
  }
}

// 合并参数中的配置
module.exports = (configList => {
  let chainWebpacks = [];

  let vueConfig = configList.reduce((sum, item) => {
    // eslint-disable-next-line no-unused-expressions
    item.chainWebpack && chainWebpacks.push(item.chainWebpack);
    return Object.assign(sum, item);
  }, {});

  vueConfig.chainWebpack = config => {
    chainWebpacks.forEach(item => {
      item(config);
    });
  };
  return vueConfig;
})(configs);

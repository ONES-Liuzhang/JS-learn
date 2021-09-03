#!/usr/bin/env node

const webpack = require('webpack');
const minimist = require('minimist');
const builtInWebpackConfig = require('../webpack.config');
const path = require('path');
const args = minimist(process.argv.slice(2));

// 这里只是为了好看代码，写一起了，正常是要做一下拆分的
// class PluginManager extends Plugin {} <- 内聚到一个模块实现
const __commands = {};
const __plugins = {};
const fname = 'dd.config.js';

const runWebpackBuild = () => {
  webpack(builtInWebpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      return console.log('build failed.')
    }
  
    console.log('build success.');
  })
}

// 封装 api，这个是作为参数塞到自定义插件函数中的，通过这个 api 往外暴露能力
// 正常还是要写一个 class Api extends BaseApi {}
const api = {
  registerCommands(name, impl) {
    const command = __commands[name];
    if (!command) {
      __commands[name] = impl
    }
  },
  chainWepach() {

  },
  addWebpackPlugin(plugin) {
    
  }
}

// 读取用户本地的配置文件 dd.config.js
const readLocalOption = () => new Promise((resolve) => {
  const config = require(path.join(process.cwd(), fname)) || {};
  const { plugins: { commands = [] } = {} } = config;
  if (commands.length) {
    commands.forEach(command => {
      command(api);
    })
  }

  resolve(__commands);
})

readLocalOption().then((commands) => {
  const command = args._[0]; // 取执行命令  dd clean
  if (commands[command]) {
    commands[command]();
  }
  else {
    runWebpackBuild();
  }
})
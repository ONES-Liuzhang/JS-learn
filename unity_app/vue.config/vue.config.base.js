const resolveApp = require('./resolveApp')
// const isDev = process.env.NODE_ENV === 'development';
// const isPro = process.env.NODE_ENV === 'production';

console.log('const config = ');

module.exports = {
  publicPath: '', // 使用相对路径
  assetsDir: '',
  lintOnSave: true,
  chainWebpack: config => {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // 改变入口文件
    config
      .entry('app')
      .clear()
      .add('./packages/app')
      .end();

    // 别名设置
    config.resolve.alias
      .set('@', resolveApp('packages'))
      // .set('svg', resolveApp('svg'))
      .end()

    require('./libs/lodash')(config)

    require('./libs/svg')(config)

    require('./libs/less')(config)

  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          '@main-w': '1200px', // banner中心宽度

          '@primary-color': '#F56515', // 主色

          '@primary-color2': 'linear-gradient(to right, #FF5938, #FF8626)', // 主色2

          '@border-color': '#ccc', // 边框色
          '@success-color': '#55C059', // 成功辅助色
          '@fail-color': '#FF3232', // 失败辅助色
          '@warn-color': '#EF9817', // 警告辅助色
          '@link-color': '#5ca3e8', // 链接色

          '@border-radius-base': '2px',

        },
        javascriptEnabled: true,
      },
      // stylus: {
      //   // import: [resolveApp('src/styles/variable/index.styl')]
      // }
    },
  },
};

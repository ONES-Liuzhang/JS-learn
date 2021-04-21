const webpack = require('webpack')
const resolveApp = require('../../vue.config/resolveApp')
const fs = require('fs')

module.exports = {
  assetsDir: 'assets',
  chainWebpack: config => {

    // 输出配置
    config.output
      .filename(`[name].[contenthash:8].js`)
      .chunkFilename(`assets/[name].[contenthash:8].js`)
      .end();

    // config.optimization.splitChunks({});
    config.optimization.splitChunks({
      /*
       * chunks的含义是拆分模块的范围，它有三个值async、initial和all。 默认是 async
       * async表示只从异步加载得模块（动态加载import()）里面进行拆分(默认)
       * initial表示只从入口模块进行拆分import { antdv } from "@/base";

       * all表示以上两者都包括
       */
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      // 允许入口并行加载的最大请求数, 默认是3
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      // { boolean | function (module, chunks, cacheGroupKey) | string }, 默认: true
      // name: `${mStr}/chunks/[chunks]`,
      name(m, chunks, cacheGroupKey) {
        let c = chunks.map(item => item.name).join('~');
        return `splitChunks/${cacheGroupKey}~${c}`;
      },
      cacheGroups: {
        // base: {
        //   name(m, chunks, cacheGroupKey) {
        //     let c = chunks.map(item => item.name).join('~');
        //     return `base/${c}`;
        //   },
        //   test: /[\\/]base[\\/]/,
        //   priority: 20
        // },
        // antdv: {
        //   name(m, chunks, cacheGroupKey) {
        //     let c = chunks.map(item => item.name).join('~');
        //     return `antdv/${c}`;
        //   },
        //   test: /[\\/]antdv[\\/]/,
        //   priority: 20
        // },
        // vendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   priority: -10
        // },
        default: {
          // name: `${mStr}/chunks`,
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    }).end()
    // 模块导入
    const loadModules = [
      'vendor',
      // 'base',
      // 'demo'
    ]
    loadModules.forEach(m => {
      config
        .plugin(`dll-reference-plugin_${m}`)
        .use(webpack.DllReferencePlugin)
        .tap(options => {
          options[0] = { manifest: resolveApp(`packages/${m}/dist/manifest.json`) };
          return options;
        })
        .end()
    })
    // 复制所有模块的dist文件
    config.plugin('copy')
      .tap(options => {
        let [option] = options
        loadModules.forEach(m => {
          option.push({
            from: resolveApp(`packages/${m}/dist`),
            to: resolveApp(`dist/${m}`),
            ignore: ['manifest.json'],
          })
        })
        return options
      })
      .end()

    config.plugin('html')
      .tap((options) => {
        let [option] = options
        option.minify = false // 不压缩html

        // 设置html要导入的 script 标签列表
        option.costomScripts = (() => {
          let list = []
          loadModules.forEach(m => {
            let filenames = fs.readdirSync(resolveApp(`packages/${m}/dist`))
            if (!filenames) return
            // eslint-disable-next-line max-nested-callbacks
            let target = filenames.find(filename => (filename.startsWith('app') && filename.endsWith('js')))
            if (target) {
              list.push({ src: `${m}/${target}` })
            }
          })
          return list
        })()
        return options
      })
      .end()

  },

}

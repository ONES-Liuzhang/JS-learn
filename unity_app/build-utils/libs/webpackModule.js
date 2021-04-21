const fileLoader = require.resolve('file-loader');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 获取less-loader 配置
function getLessLoaderSetting() {
  const lessRegex = /\.less$/; // normal less 文件匹配
  const lessModuleRegex = /\.m(odule){0,1}\.less$/; // module less 文件配置

  // const miniCssExtractPluginLoaderSetting = {
  //   loader: MiniCssExtractPlugin.loader,
  //   options: {
  //     esModule: true,
  //     hmr: false,
  //     publicPath: '../../'
  //   }
  // };
  const postcssLoaderSetting = {
    loader: require.resolve('postcss-loader'),
    options: {
      sourceMap: false,
      plugins: [
        function () {
          /* omitted long function */
        }
      ]
    }
  };
  const lessLoaderSetting = {
    loader: require.resolve('less-loader'),
    options: {
      sourceMap: false,
      modifyVars: {
        'primary-color': '#F56515',
        'border-radius-base': '2px'
      },
      javascriptEnabled: true
    }
  };

  function getCssLoaderSetting(isModule) {
    let map = {
      loader: require.resolve('css-loader'),
      options: {
        url: true, // 启用/禁用 url() 处理, 默认: true
        // To import styles from a node_modules path (include resolve.modules) and for alias, prefix it with a ~:
        import: true, // 启用/禁用 @import 处理
        sourceMap: false, // 启用/禁用 Sourcemap
        importLoaders: 2, // 在 css-loader 前应用的 loader 的数量, 默认: 0
        localsConvention: 'camelCase' // 类名的暴露方式, 默认'asIs'
      }
    };
    if (isModule) {
      // {Boolean|String|Object}	Enables/Disables CSS Modules and their configuration
      map.options.modules = { localIdentName: '[name]_[local]_[hash:base64:5]' };
    }
    return map;
  }

  const l = {
    test: lessModuleRegex,
    sideEffects: true,
    use: [
      // miniCssExtractPluginLoaderSetting,
      getCssLoaderSetting(true),
      postcssLoaderSetting,
      lessLoaderSetting
    ]
  }
  const m = {
    test: lessRegex,
    exclude: lessModuleRegex,
    sideEffects: true,
    use: [
      // miniCssExtractPluginLoaderSetting,
      getCssLoaderSetting(),
      postcssLoaderSetting,
      lessLoaderSetting
    ]
  }
  return [l, m]
}

// js ts loader 配置
function getJsTsLoaderSetting() {
  // ts  tsx 文件加载设置
  const tsLoadSetting = {
    test: /\.tsx?$/,
    use: [
      { loader: require.resolve('cache-loader') },
      { loader: require.resolve('thread-loader') },
      { loader: require.resolve('babel-loader') },
      {
        loader: require.resolve('ts-loader'),
        options: {
          // 如果要大大加快编译速度，可以设置此标志。 但是，您从应用程序中不同依赖项之间的静态类型检查中获得的许多好处将丢失。
          // 建议与fork-ts-checker-webpack-plugin一起使用transpileOnly再次进行完整类型检查。 要了解实际情况，请看看我们的简单示例。
          transpileOnly: true,
          // appendTsSuffixTo: ["\\.vue$"],
          happyPackMode: true
        }
      }
    ]
  };
  // js  jsx 文件加载设置
  const jsLoadSetting = {
    test: /\.jsx?$/,
    use: [
      { loader: require.resolve('cache-loader') },
      { loader: require.resolve('thread-loader') },
      { loader: require.resolve('babel-loader') }
    ]
  };

  return [tsLoadSetting, jsLoadSetting];
}

module.exports = function (mStr) {
  if (!mStr) {
    throw new Error('webpack config 获取module 没有指定模块名称  mStr');
  }
  // 图片加载设置
  const imgLoadSetting = {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    use: [{
      loader: require.resolve('url-loader'),
      options: {
        limit: 4096,
        // 图片超过图片大小就使用fileLoader
        fallback: {
          loader: fileLoader,
          options: { name: `static/images/[name].[hash:8].[ext]` }
        }
      }
    }]
  };
  // svg加载设置
  const svgLoadSetting = {
    test: /\.(svg)(\?.*)?$/,
    use: [{
      loader: fileLoader,
      options: { name: `static/svg/[name].[hash:8].[ext]` }
    }],
    sideEffects: true
  };

  // 其他文件加载设置
  const fileLoadSetting = {
    loader: fileLoader,
    // Exclude `js` files to keep "css" loader working as it injects its runtime that would otherwise be processed through "file" loader.
    // Also exclude `html` and `json` extensions so they get processed by webpacks internal loaders.
    exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
    options: { name: 'static/media/[name].[hash:8].[ext]' }
  };

  return {
    noParse: /^(vue|vue-router|vuex|axios|antd|vuex-router-sync)$/,
    rules: [{
      // “ oneOf”将遍历所有后续装载程序，直到满足要求为止。 如果没有匹配的加载程序，它将退回到加载程序列表末尾的“文件”加载程序。
      oneOf: [
        ...getJsTsLoaderSetting(),
        ...getLessLoaderSetting(),
        imgLoadSetting,
        svgLoadSetting,
        fileLoadSetting
      ]
    }]
  };
};

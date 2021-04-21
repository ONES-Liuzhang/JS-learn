/*
 * module：就是js的模块化webpack支持commonJS、ES6等模块化规范，简单来说就是你通过import语句引入的代码。
 * chunk: chunk是webpack根据功能拆分出来的，包含三种情况：
 *  1、你的项目入口（entry）
 *  2、通过import()动态引入的代码
 *  3、通过splitChunks拆分出来的代码
 *  chunk包含着module，可能是一对多也可能是一对一。
 * bundle：bundle是webpack打包之后的各个文件，一般就是和chunk是一对一的关系，bundle就是对chunk进行编译压缩打包等处理之后的产出。
 */
// const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function (mStr) {
  // if (mStr) return { minimize: false };
  return {
    // 告知 webpack是否使用 TerserPlugin 压缩 bundle。production 模式下，这里默认是 true。
    minimize: false,

    // 允许你通过提供一个或多个定制过的 TerserPlugin 实例，覆盖默认压缩工具(minimizer)。
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            arrows: false,
            collapse_vars: false,
            comparisons: false,
            computed_props: false,
            hoist_funs: false,
            hoist_props: false,
            hoist_vars: false,
            inline: false,
            loops: false,
            negate_iife: false,
            properties: false,
            reduce_funcs: false,
            reduce_vars: false,
            switches: false,
            toplevel: false,
            typeofs: false,
            booleans: true,
            if_return: true,
            sequences: true,
            unused: true,
            conditionals: true,
            dead_code: true,
            evaluate: true
          },
          mangle: { safari10: true }
        },
        sourceMap: false,
        cache: true,
        parallel: true,
        extractComments: false
      })
    ],

    // 根据不同的策略来分割打包出来的chunk。
    splitChunks: {
      /*
       * chunks的含义是拆分模块的范围，它有三个值async、initial和all。 默认是 async
       * async表示只从异步加载得模块（动态加载import()）里面进行拆分(默认)
       * initial表示只从入口模块进行拆分
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
        // console.log(3, chunks);
        let c = chunks.map(item => item.name).join('~');
        // console.log(3333, chunks.map(item => item.name).join("~"));
        return `${mStr}/chunks/${cacheGroupKey}~${c}`;
      },
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          // name: `${mStr}/chunks`,
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },

    // {object string boolean},  是否导出runtime chunk, 默认为false
    runtimeChunk: false,

    // 在编译出错时，用来跳过生成阶段(emitting phase)。这可以确保没有生成出错误资源。而 stats 中所有 assets 中的 emitted 标记都是 false。
    // noEmitOnErrors: true,

    // 告知 webpack 使用可读取模块标识符(readable module identifiers)，来帮助更好地调试。
    // webpack 配置中如果没有设置此选项，默认会在 mode development 启用，在 mode production 禁用。
    namedModules: true,

    // 告知 webpack 使用可读取 chunk 标识符(readable chunk identifiers)，来帮助更好地调试。
    // webpack 配置中如果没有设置此选项，默认会在 mode development 启用，在 mode production 禁用。
    namedChunks: true,

    // 告诉webpack选择模块ID时使用哪种算法。
    // 将moduleIds/chunkIds设置为false会告诉Webpack不应该使用任何内置算法，
    // 因为可以通过插件提供自定义算法。 默认情况下设置为false。
    /*
        Option	            Description
      'natural'          Numeric ids in order of usage.
      'named'            Readable ids for better debugging.
      'size'             Numeric ids focused on minimal initial download size.
      'total-size'       numeric ids focused on minimal total download size
       */
    moduleIds: 'named',
    chunkIds: 'named',

    // 告知 webpack 将 process.env.NODE_ENV 设置为一个给定字符串。
    // 如果 optimization.nodeEnv 不是 false，则会使用 DefinePlugin，optimization.nodeEnv 默认值取决于 mode，如果为 falsy 值，则会回退到 "production"。
    nodeEnv: false,

    // 在设置为 true 时，告知 webpack 通过将导入修改为更短的字符串，来减少 WASM 大小。
    // 这会破坏模块和导出名称。 默认: false
    mangleWasmImports: false,

    // 如果模块已经包含在所有父级模块中，告知 webpack 从 chunk 中检测出这些模块，或移除这些模块。默认: true,
    removeAvailableModules: true,

    // 如果 chunk 为空，告知 webpack 检测或移除这些 chunk。 默认: true
    removeEmptyChunks: true,

    // 告知 webpack 合并含有相同模块的 chunk。默认: true
    mergeDuplicateChunks: true,

    // 告知 webpack 确定和标记出作为其他 chunk 子集的那些 chunk，
    // 其方式是在已经加载过较大的 chunk 之后，就不再去加载这些 chunk 子集。
    // optimization.flagIncludedChunks 默认会在 production mode 中启用，其他情况禁用。
    flagIncludedChunks: true,

    // Tells webpack to figure out an order of modules which will result in the smallest initial bundle.
    // By default optimization.occurrenceOrder is enabled in production mode and disabled elsewise.
    occurrenceOrder: true,

    // Tells webpack to figure out which exports are provided by modules to
    // generate more efficient code for export * from ....
    // By default optimization.providedExports is enabled.
    providedExports: true,

    // Tells webpack to determine used exports for each module.
    // This depends on optimization.providedExports.
    // Information collected by optimization.usedExports is used by other optimizations
    // or code generation i.e. exports are not generated for unused exports,
    // export names are mangled to single char identifiers when all usages are compatible.
    // Dead code elimination in minimizers will benefit from this and can remove unused exports.
    // By default optimization.usedExports is enabled in production mode and disabled elsewise.
    usedExports: true,

    // Tells webpack to find segments of the module graph which can be safely concatenated into a single module.
    // Depends on optimization.providedExports and optimization.usedExports.
    // By default optimization.concatenateModules is enabled in production mode and disabled elsewise.
    concatenateModules: true,

    // Tells webpack to recognise the sideEffects flag in package.json or rules
    // to skip over modules which are flagged to contain no side effects when exports are not used.
    // Optimization.sideEffects取决于要启用的optimization.providedExports。
    // 这种依赖关系会花费大量的构建时间，但是由于减少了代码生成，因此消除模块会对性能产生积极影响。
    // 这种优化的效果取决于您的代码库，请尝试使用它以获得可能的性能。
    // By default optimization.sideEffects is enabled in production mode and disabled elsewise.
    sideEffects: true,

    // optimization.portableRecords tells webpack to generate records with relative paths
    // to be able to move the context folder.
    // By default optimization.portableRecords is disabled.
    // Automatically enabled if at least one of the records options
    // provided to webpack config: recordsPath, recordsInputPath, recordsOutputPath.
    portableRecords: false
  };
};

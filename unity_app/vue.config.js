module.exports = require('./vue.config/index')

// const path = require("path");
// const webpack = require("webpack");
// const fs = require("fs");

// const configArgv = JSON.parse(process.env.npm_config_argv);
// const args = configArgv.original.slice(2);
// let mIndex = args.indexOf("-m");
// let build_m = args[mIndex + 1] || "";
// if (mIndex >= 0 && build_m) {
//   process.env.build_m = build_m;
// }

// console.log("模块", process.env.build_m);

// const {
//   resolveApp,
//   build,
//   getDllPlugin,
//   getDllRefPlugins,
//   getDllList,
//   getDllRefPluginByKey
// } = require("./build-utils");

// const isDev = process.env.NODE_ENV === "development";
// const isPro = process.env.NODE_ENV === "production";

// console.log("module.exports =");
// module.exports = {
//   publicPath: "", // 使用相对路径
//   assetsDir: "assets",
//   productionSourceMap: false,
//   runtimeCompiler: isPro,
//   lintOnSave: isDev,
//   chainWebpack: config => {
//     config.plugins.delete("preload");
//     config.plugins.delete("prefetch");
//     config.resolve.alias
//       // .delete("vue$")
//       .set("@", resolveApp("packages"))
//       .end();
//     ///////////////////////////////////////////////
//     /////开发配置//////////////////////////
//     ///////////////////////////////////////////////
//     if (isDev) {
//       require("./vue-config-utils/setDevConfig")(config);
//     }

//     if (build_m) {
//       require("./vue-config-utils/setProConfig")(config);
//       return;
//     }
//     if (isPro) {
//       //////////////////////////////////////////////////////////
//       //////**********生产配置 */
//       //////////////////////////////////////////////////////////
//       ///////////////////////
//       config
//         .externals({
//           vue: "Vue"
//         })
//         .end();
//       //////////////////////////
//       config.resolve.modules.add(resolveApp("packages")).end();
//       config
//         .plugin("html")
//         .tap(args => {
//           let arg = args[0];
//           arg.costomScripts = getDllList();
//           // ars.meta = {
//           //   // viewport: "width=device-width, initial-scale=1, shrink-to-fit=no"
//           // };
//           arg.minify = false;
//           return args;
//         })
//         .end();
//       getDllList().forEach(item => {
//         let manifest = item.manifest;
//         if (!manifest) return;
//         config
//           .plugin("dll-reference-plugin_" + item.name)
//           .use(webpack.DllReferencePlugin)
//           .tap(options => {
//             options[0] = { manifest };
//             return options;
//           })
//           .end();
//       });

//       // config
//       //   .plugin("ScriptExtHtmlWebpackPlugin")
//       //   .after("html")
//       //   .use("script-ext-html-webpack-plugin", [
//       //     {
//       //       // `runtime` must same as runtimeChunk name. default is `runtime`
//       //       inline: /runtime\..*\.js$/
//       //     }
//       //   ]);

//       config.optimization
//         .splitChunks({
//           chunks: "all",
//           cacheGroups: {
//             vendors: {
//               name: "chunks/node_modules-vendors",
//               test: /[\\/]node_modules[\\/]/,
//               priority: -10,
//               chunks: "initial"
//             },
//             // common: {
//             //   name: "chunk-common",
//             //   minChunks: 2,
//             //   priority: -20,
//             //   chunks: "initial",
//             //   reuseExistingChunk: true
//             // },
//             componentCommons: {
//               name: "chunks/component-commons",
//               test: resolveApp("src/components"), // can customize your rules
//               minChunks: 3, //  minimum common number
//               priority: 5,
//               reuseExistingChunk: true
//             }
//           }
//         })
//         .runtimeChunk("single") //  分离runtime
//         .minimize(false) // 配置不压缩js
//         .end();
//     }
//   },
//   css: {
//     loaderOptions: {
//       less: {
//         modifyVars: {
//           // @primary-color: #1890ff; // 全局主色
//           // @link-color: #1890ff; // 链接色
//           // @success-color: #52c41a; // 成功色
//           // @warning-color: #faad14; // 警告色
//           // @error-color: #f5222d; // 错误色
//           // @font-size-base: 14px; // 主字号
//           // @heading-color: rgba(0, 0, 0, 0.85); // 标题色
//           // @text-color: rgba(0, 0, 0, 0.65); // 主文本色
//           // @text-color-secondary : rgba(0, 0, 0, .45); // 次文本色
//           // @disabled-color : rgba(0, 0, 0, .25); // 失效色
//           // @border-radius-base: 4px; // 组件/浮层圆角
//           // @border-color-base: #d9d9d9; // 边框色
//           // @box-shadow-base: 0 2px 8px rgba(0, 0, 0, 0.15); // 浮层阴影
//           "primary-color": "#F56515",
//           // 'link-color': '#1DA57A',
//           "border-radius-base": "2px"
//         },
//         javascriptEnabled: true
//       },
//       stylus: {
//         import: [resolveApp("src/styles/variable/index.styl")]
//       }
//     }
//   }
// };

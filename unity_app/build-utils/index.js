exports.resolveApp = require('./libs/resolveApp');
exports.build = require('./libs/build');

exports.webpackModule = require('./libs/webpackModule');
exports.webpackPlugins = require('./libs/webpackPlugins');
exports.webpackResolve = require('./libs/webpackResolve');
exports.webpackOutput = require('./libs/webpackOutput');
exports.webpackOptimization = require('./libs/webpackOptimization');
exports.webpackOther = require('./libs/webpackOther');

const dllTool = require('./libs/dllTool');

exports.getDllPlugin = dllTool.getDllPlugin;
exports.getDllList = dllTool.getDllList;
exports.getDllRefPlugins = dllTool.getDllRefPlugins;
exports.getDllRefPluginByKey = dllTool.getDllRefPluginByKey;

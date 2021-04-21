
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

// const webpack = require('webpack')
module.exports = function (config) {

  config
    .plugin('lodash-webpack-plugin')
    .use(LodashModuleReplacementPlugin)
    .end()

}

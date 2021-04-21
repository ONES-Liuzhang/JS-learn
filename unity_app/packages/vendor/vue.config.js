/* eslint-disable no-unused-vars */
const webpack = require('webpack')
const resolveApp = require('../../vue.config/resolveApp')
module.exports = {
  productionSourceMap: false,

  chainWebpack: (config) => {
    config
      .entry('app')
      .clear()
      .add('vue-router')
      .add('axios')
      .add('vue-property-decorator')
      .add('moment')
      .add('tslib')
      // .add('zrender')
      // .add('lodash')
      .add('async-validator')
      .add('core-js/features/string')
      .add('core-js/features/number')

      .add('core-js/features/promise')

      // .add('echarts')
      .end()
    // config.end()
    config.optimization.splitChunks({}).end()
  },
}

/* eslint-disable no-unused-vars */
const webpack = require('webpack')
const resolveApp = require('../../vue.config/resolveApp')
module.exports = {
  chainWebpack: (config) => {
    const loadModules = ['base']
    // 设置dll ref
    loadModules.forEach((m) => {
      config
        .plugin(`dll-reference-plugin_${m}`)
        .use(webpack.DllReferencePlugin)
        .tap((options) => {
          options[0] = { manifest: resolveApp(`packages/${m}/dist/manifest.json`) }
          return options
        })
        .end()
    })
  },
}

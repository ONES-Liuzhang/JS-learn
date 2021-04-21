
const isDev = process.env.NODE_ENV === 'development';
const isPro = process.env.NODE_ENV === 'production';

module.exports = function (config) {
  if (isDev) {
    config.module.rule('less')
      .oneOf('normal-modules')
      .use('css-loader')
      .tap(options => {
        options.modules.localIdentName = '[path]_[local]_[hash:base64:5]'
        return options
      })
      .end()
  }
  if (isPro) {
    config.module.rule('less')
      .oneOf('normal-modules')
      .use('css-loader')
      .tap(options => {
        options.modules.localIdentName = '[hash:base64]'
        return options
      })
      .end()
  }
}

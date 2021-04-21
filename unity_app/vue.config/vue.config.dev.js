module.exports = {
  lintOnSave: 'error',
  devServer: {
    port: 3000,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  chainWebpack: config => {
    config.optimization.splitChunks({}).end()
  },
};

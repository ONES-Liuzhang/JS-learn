const vuePreset = require('@vue/cli-plugin-babel/preset');

module.exports = (() => {
  // console.log(JSON.stringify(vuePreset()));

  return {
    presets: [
      vuePreset
      // require('@vue/babel-preset-jsx'),
    ],
    plugins: [
      require('babel-plugin-lodash'),
    ]
  };
})();

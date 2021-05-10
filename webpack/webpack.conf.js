const path = require("path");

module.exports = {
  mode: "development",
  entry: "./app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  modules: {
    rules: [
      {
        test: /\.css$/,
        use: [path.join(__dirname, "loaders", "style-loader.js")],
      },
    ],
  },
};

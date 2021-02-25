const path = require("path");
const merge = require("webpack-merge");
const base = require("./webpack.common");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(base, {
  mode: "production",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "../", "build"),
    publicPath: "./",
  },
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer:
      [
        new TerserPlugin({
          parallel: true,
        }),
      ],
  },
});

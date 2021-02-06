const path = require("path");
const merge = require("webpack-merge");
const base = require("./webpack.common");

module.exports = merge(base, {
  mode: "production",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "../", "build"),
    publicPath: "./",
  },
  devtool: "nosources-source-map",
});

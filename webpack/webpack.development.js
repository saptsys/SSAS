const path = require("path");
const merge = require("webpack-merge");
const base = require("./webpack.common");

module.exports = merge(base, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    writeToDisk: true,
    host: "localhost",
    port: "8080",
    hot: true,
    compress: true,
    contentBase: path.resolve(__dirname, "build"),
    watchContentBase: true,
    watchOptions: {
      ignored: "../node_modules/",
    },
  },
});

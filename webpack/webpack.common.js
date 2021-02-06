const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "../", "src", "index.js"),
  devtool: "inline-source-map",
  target: "web",
  module: {
    rules: [
      {
        test: /\.(js)x?$/,
        include: [path.resolve(__dirname, "../src")],
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ],
              "@babel/preset-react",
              {
                plugins: ["@babel/plugin-proposal-class-properties"],
              },
            ],
          },
        },
        resolve: {
          extensions: [".js", ".jsx", ".json"],
        },
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, "../src"), path.resolve(__dirname, "../node_modules")],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        resolve: {
          extensions: [".css"],
        },
      },
    ],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "../", "build"),
    
  },
  plugins: [
    new MiniCssExtractPlugin({}),
    new HtmlWebpackPlugin({

      filename: "index.html",
      title: "ssas",
      cspPlugin: {
        enabled: true,
        policy: {
          "base-uri": "'self'",
          "object-src": "'none'",
          "script-src": ["'self'"],
          "style-src": ["'self'"],
        },
        hashEnabled: {
          "script-src": true,
          "style-src": true,
        },
        nonceEnabled: {
          "script-src": true,
          "style-src": true,
        },
      },
    }),
    new CspHtmlWebpackPlugin(),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: "static",
    }),
  ],
};

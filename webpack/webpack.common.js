const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

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
            plugins: [
              [
                "import",
                {
                  libraryName: "antd",
                  style: "less", // or 'css'
                },
              ],
            ],
          },
        },
        resolve: {
          extensions: [".js", ".jsx", ".json"],
        },
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, "../src"),
          path.resolve(__dirname, "../node_modules"),
        ],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        resolve: {
          extensions: [".css"],
        },
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                strictMath: true,
              },
              javascriptEnabled: true,
            },
          },
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif|)$/,
        use: "url-loader",
      },
    ],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "../", "build"),
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: ["en"],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({}),
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "ssas",
      cspPlugin: {
        enabled: true,
        policy: {
          "base-uri": "'self'",
          "object-src": "'none'",
          "script-src": ["'self'"]
        },
        hashEnabled: {
          "script-src": true,
        },
        nonceEnabled: {
          "script-src": true,
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

/**
 * Base webpack config used across other specific configs
 */
import path from 'path';
import webpack from 'webpack';
import fs from 'fs';
import {
  dependencies as externals
} from '../app/package.json';
import {
  dependencies as possibleExternals
} from '../package.json';
// Find all the dependencies without a `main` property and add them as webpack externals
function filterDepWithoutEntryPoints(dep) {
  // Return true if we want to add a dependency to externals
  try {
    // If the root of the dependency has an index.js, return true
    if (
      fs.existsSync(path.join(__dirname, '..', `node_modules/${dep}/index.js`))
    ) {
      return false;
    }
    const pgkString = fs
      .readFileSync(require.resolve(`${dep}/package`))
      .toString();
    const pkg = JSON.parse(pgkString);
    const fields = ['main', 'module', 'jsnext:main', 'browser'];
    return !fields.some(field => field in pkg);
  } catch (e) {
    // console.log(e);
    return true;
  }
}

export default {
  externals: [
    {
      typeorm: 'commonjs typeorm',
      sqlite3: 'commonjs sqlite3'
    },
    ...Object.keys(externals || {}),
    ...Object.keys(possibleExternals || {}).filter(filterDepWithoutEntryPoints)
  ],

  module: {
    rules: [{
      test: /\.less$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader', // translates CSS into CommonJS
      }, {
        loader: 'less-loader', // compiles Less to CSS
        options: {
          lessOptions: { // If you are using less-loader@5 please spread the lessOptions to options directly
            strictMath: false,
            javascriptEnabled: true,
          },
        },
      }],
    },
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    }
    ],
  },
  output: {
    path: path.join(__dirname, '..', 'app'),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2'
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [path.join(__dirname, '..', 'app'), 'node_modules']
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    })
  ]
};

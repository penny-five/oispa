const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

const pkg = require('../package.json');


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      components: 'src/components',
      assets: 'assets'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader'
          }
        }
      },
      {
        test: /\.scss$/,
        loader: 'css-loader!sass-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|otf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?|(jpg|png|gif)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
      'process.env.APP_VERSION': `"${pkg.version}"`,
      'process.env.APP_HOMEPAGE': `"${pkg.homepage}"`
    }),
    new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(fi)$/),
    new HtmlPlugin({
      title: 'Oispa',
      template: 'assets/index.ejs',
      hash: false
    }),
    new CleanPlugin(['*.js'], {
      root: path.resolve(__dirname, '..', 'dist'),
      verbose: false
    })
  ]
};

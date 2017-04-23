const webpack = require('webpack');
const BabiliPlugin = require('babili-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const loaders = require('./loaders');


module.exports = {
  output: {
    filename: 'bundle.[hash].js'
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: ExtractTextPlugin.extract({
              fallback: 'vue-style-loader',
              use: loaders.scss
            })
          }
        }
      }
    ]
  },
  plugins: [
    new BabiliPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new ExtractTextPlugin('style.[contenthash].css')
  ]
};

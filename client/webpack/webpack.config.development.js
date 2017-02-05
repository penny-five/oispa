const webpack = require('webpack');
const path = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');


module.exports = {
  devtool: '#eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '..', 'dist'),
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
};

const path = require('path');

module.exports = {
  entry: {
    '/handlers/beerstyles': './handlers/beerstyles.js'
  },
  target: 'node',
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  externals: ['aws-sdk'],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};

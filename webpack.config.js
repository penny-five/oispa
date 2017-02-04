const path = require('path');

module.exports = {
  entry: {
    handler: './handler.js'
  },
  target: 'node',
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel'],
        options: {
          plugins: ["transform-runtime"],
          presets: ["es2015"]
        }
      }
    ]
  }
}

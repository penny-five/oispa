require('dotenv').config();
const merge = require('webpack-merge');

const baseConfig = require('./webpack/webpack.config.base');


const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  module.exports = merge(baseConfig, require('./webpack/webpack.config.production'));
} else {
  module.exports = merge(baseConfig, require('./webpack/webpack.config.development'));
}

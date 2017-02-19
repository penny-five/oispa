require('dotenv').config();
const merge = require('webpack-merge');

const baseConfig = require('./webpack/webpack.config.base');


const isProduction = process.env.NODE_ENV === 'production';

let buildConfig;
if (isProduction) {
  buildConfig = require('./webpack/webpack.config.production'); // eslint-disable-line global-require
} else {
  buildConfig = require('./webpack/webpack.config.development'); // eslint-disable-line global-require
}

module.exports = merge.smart(baseConfig, buildConfig);

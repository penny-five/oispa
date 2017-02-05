require('dotenv').config();
const merge = require('webpack-merge');

const baseConfig = require('./webpack/webpack.config.base');
const developmentConfig = require('./webpack/webpack.config.development');
const productionConfig = require('./webpack/webpack.config.production');


const isProduction = process.env.NODE_ENV === 'production';

const config = merge(baseConfig, isProduction ? productionConfig : developmentConfig);
module.exports = config;

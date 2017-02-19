const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const baseConfig = require('./webpack/webpack.config.base');
const productionConfig = require('./webpack/webpack.config.production');


const config = merge.smart(baseConfig, productionConfig, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../report.html',
      openAnalyzer: true
    })
  ]
});

module.exports = config;

const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './js/index.js',
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    // new BundleAnalyzerPlugin()
  ],
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './',
    historyApiFallback: true
  }
};

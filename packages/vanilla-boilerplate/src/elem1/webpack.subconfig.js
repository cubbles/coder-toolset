const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const wpkgUtils = require('@cubbles/wpkg-utils');
const webpackageName = wpkgUtils.getWebpackageName;
const elementName = webpackageName + '-' + __dirname.split(path.sep).pop();
const distFolder = path.resolve(__dirname, global.cubx.distFolderWebpackage, elementName);

const config = {
  // make this configuration independent from the current working directory
  context: path.resolve(__dirname),
  // define the entry module for the bundle to be created
  entry: './element.js',
  output: {
    path: distFolder,
    filename: 'element.bundle.js'
  },
  module: {
    rules: [
      {
        // manage placeholdes in js files
        test: /\.js$/,
        use: [
          { loader: `preprocess-loader?elementName=${elementName}` }
        ]
      },
      {
        test: /\.sss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              hmr: false
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: `${webpackageName}_[local]`
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: '**/*.md', to: distFolder }
    ], {}),
    new HtmlWebpackPlugin({
      template: 'element.html',
      inject: 'body',
      filename: 'element.html',
      // manage placeholders
      templateParameters: {
        webpackageName: `${webpackageName}`,
        elementName: `${elementName}`
      }
    }),
    new HtmlWebpackPlugin({
      template: 'SHOWROOM.html',
      filename: 'SHOWROOM.html',
      // manage placeholders
      templateParameters: {
        webpackageName: `${webpackageName}`,
        elementName: `${elementName}`
      }
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundleReport.html',
      openAnalyzer: false
    })
  ]
};
module.exports = config;

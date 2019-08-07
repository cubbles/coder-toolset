const find = require('find');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
// const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
const wpkgUtils = require('@cubbles/wpkg-utils');
const distFolder = path.resolve(__dirname, '../dist', wpkgUtils.getWebpackageName);

global.cubx = {
  distFolder,
  distFolderWebpackage: distFolder
};

const baseConfig = {
  // make this configuration independent from the current working directory
  context: path.resolve(__dirname),
  // define the entry module for the bundle to be created
  entry: './main.js',
  // entry: `./../package-scripts.js`,
  output: {
    path: global.cubx.distFolderWebpackage
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'README.md', to: 'README.md' }
    ], {}),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
      // manage placeholders
      templateParameters: {
        webpackageName: `${wpkgUtils.getWebpackageName}`,
        artifactIndex: `${wpkgUtils.generateArtifactsIndex()}`
      }
    }),
    // NOTE: The file will re-generated while watching the files.
    // @see https://github.com/webpack/webpack/issues/2919
    // Perhaps ... https://github.com/webpack/webpack/issues/2919#issuecomment-245390239
    // ... https://webpack.js.org/api/compiler-hooks/#watching
    new GenerateJsonPlugin('manifest.webpackage', wpkgUtils.getManifestWebpackage, null, 2),
    new FileManagerPlugin({
      onEnd: {
        archive: [
          {
            source: path.resolve(__dirname),
            destination: path.join(distFolder, `${wpkgUtils.getWebpackageName}.tar.gz`),
            format: 'tar'
          }
        ]
      }
    })
  ],

  /**
     * This option controls if and how source maps are generated.
     * With this feature, we know exactly where to look in order to fix/debug issues in our application.
     * Very very useful for development purpose, but should NOT use in production.
     * @see https://survivejs.com/webpack/building/source-maps/#-sourcemapdevtoolplugin-and-evalsourcemapdevtoolplugin-
     */
  devtool: 'source-map',

  /**
     * If watch is active, after the initial build, webpack will continue to watch for changes in any of the resolved files.
     * @see https://webpack.js.org/configuration/watch/#watch
     */
  watchOptions: {
    aggregateTimeout: 300, // the default
    ignored: /node_modules/
  }
};

// collect webpack configuration of artifacts
const artifactConfigs = [baseConfig];
const subConfigs = find.fileSync(/webpack\.subconfig.js$/, path.resolve(__dirname));
subConfigs.forEach(subConfig => {
  console.log(`Loading subconfig "${subConfig}" ...`);
  artifactConfigs.push(require(subConfig));
});

// finally define the export
module.exports = artifactConfigs;

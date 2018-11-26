const find = require('find');
const path = require('path');
const packageJSON = require(`${process.env.INIT_CWD}/package.json`);
const webpackageName = require('./getWebpackageName');

const manifest = {
  name: webpackageName,
  groupId: '',
  version: packageJSON.version,
  modelVersion: '10.0.0',
  docType: 'webpackage',
  author: {
    name: 'Hd Böhlau',
    email: 'fixme@incowia.com'
  },
  license: packageJSON.license,
  keywords: [],
  man: [],
  artifacts: {
    apps: [],
    compoundComponents: getSubManifests('compound'),
    elementaryComponents: getSubManifests('elementary'),
    utilities: getSubManifests('utility')
  }
};

/*
 * Helper functions
 */

function getSubManifests (type) {
  const subManifests = [];
  const findRegex = new RegExp(`MANIFEST\.${type}.js$`);
  const subManifestFiles = find.fileSync(findRegex, path.resolve(`${process.env.INIT_CWD}/src`));
  subManifestFiles.forEach(subManifestPath => {
    console.log(`Found ${type} "${subManifestPath}" ...`);
    const subManifest = require(subManifestPath)(webpackageName);
    const elementName = path.dirname(subManifestPath).split(path.sep).pop();
    subManifest.artifactId = `${webpackageName}-${elementName}`;
    subManifests.push(subManifest);
  });

  return subManifests;
}

module.exports = manifest;

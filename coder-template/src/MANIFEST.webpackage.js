const packageJSON = require('../package.json');
const find = require('find');
const path = require('path');

const manifest = {
  "name": packageJSON.name,
  "groupId": "",
  "version": packageJSON.version,
  "modelVersion": "10.0.0",
  "docType": "webpackage",
  "author": {
    "name": "Hd Böhlau",
    "email": "hrbu@incowia.com"
  },
  "license": packageJSON.license,
  "keywords": [],
  "man": [],
  "artifacts": {
    "apps": [],
    "elementaryComponents": getSubManifests(packageJSON.name, 'elementary'),
    "compoundComponents": getSubManifests(packageJSON.name, 'compound'),
    "utilities": getSubManifests(packageJSON.name, 'utility'),
  }
}

/*
 * Helper functions
 */

function getSubManifests(packageName, type) {
  const subManifests = [];
  const findRegex = new RegExp(`MANIFEST\.${type}.js$`);
  const subManifestFiles = find.fileSync(findRegex, path.resolve(__dirname));
  subManifestFiles.forEach(subManifestPath => {
    console.log(`Found ${type} "${subManifestPath}" ...`);
    const subManifest = require(subManifestPath);
    const elementName = path.dirname(subManifestPath).split(path.sep).pop();
    subManifest.artifactId = `${packageName}-${elementName}`;
    subManifests.push(subManifest);
  });

  return subManifests;
}

module.exports = manifest;

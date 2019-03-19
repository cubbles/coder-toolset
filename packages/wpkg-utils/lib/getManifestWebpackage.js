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
  author: getValidAuthorObject(packageJSON.author),
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

if (packageJSON.hasOwnProperty('description')) {
  manifest.description = packageJSON.description
}

if (packageJSON.hasOwnProperty('homepage')) {
  manifest.homepage = packageJSON.homepage
}

if (packageJSON.hasOwnProperty('keywords')) {
  manifest.keywords = packageJSON.keywords
}

if (packageJSON.hasOwnProperty('contributors')) {
  manifest.contributors  = getValidContributors(packageJSON.contributors)
}

if (packageJSON.hasOwnProperty('cubbles')) {
  const cubblesProperties = ['groupId', 'man', 'runnables'];
  cubblesProperties.forEach(function (prop) {
    if (packageJSON.cubbles.hasOwnProperty(prop)) {
      manifest[prop]  = packageJSON.cubbles[prop];
    }
  });
}

/*
 * Helper functions
 */

 function getValidContributors (contributors) {
   return contributors.map(function (contributor) {
    return getValidAuthorObject(contributor);
   });
 }

 function getValidAuthorObject (author) {
   if (typeof author === 'object') {
     return author;
   } else {
     let authorObject = {};
     authorObject.name = author.substring(0, author.indexOf('<')).trim();
     
     let email = author.substring(author.indexOf('<') + 1, author.indexOf('>')).trim();
     if (email !== '') {
      authorObject.email = email;
     }
     let url = author.substring(author.indexOf('(') + 1, author.indexOf(')')).trim();
     if (url !== '') {
      authorObject.url = url;
     }
     return authorObject;
   }
 }

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

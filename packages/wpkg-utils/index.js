const find = require('find');
const path = require('path');
const manifest = require('./lib/getManifestWebpackage')

module.exports = {
  test: "true",

  generateArtifactsIndex: function () {
    const links = [];
    const showRooms = find.fileSync(/SHOWROOM(.*).html$/, `${path.resolve(process.env.INIT_CWD + '/src')}`);
    showRooms.forEach(showRoom => {
      const filename = showRoom.split(path.sep).pop();
      const elementName = manifest.name + '-' + path.dirname(showRoom).split(path.sep).pop();
      links.push(`<li><a href="${elementName}/${filename}">${elementName}/${filename}</a></li>`);
      links.push(`<li><a href="${elementName}/bundleReport.html">${elementName}/bundleReport.html</a><br/>&nbsp;</li>`);
    });
    let returnString = '';
    for (var i = 0, len = links.length; i < len; i++) {
      returnString = returnString.concat(links[i] + '\n');
    }
    return `${returnString}`;
  },

  getWebpackageName: require('./lib/getWebpackageName'),
  getManifestWebpackage: require('./lib/getManifestWebpackage')

}

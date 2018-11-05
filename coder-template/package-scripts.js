/**
 * This file contains some util functions referred by the npm scripts of package.json
 * TODO: Move this into a separate package to allow updating existing projects via 'npm update' or 'yarn update'
 */
const packageJSON = require('./package.json')
const opn = require('opn');
const find = require('find');
const path = require('path');

module.exports = {
  open: (timeout = 500) => {
    setTimeout(function(timeout) {
      opn(`http://localhost:4000/${packageJSON.name}/index.html`, {app: 'chrome'});
    }, 3000);
  },


  artifactIndex: () => {
    const links = [];
    const showRooms = find.fileSync(/SHOWROOM(.*).html$/, `${path.resolve(__dirname + '/src')}`);
    showRooms.forEach(showRoom => {
      const filename = showRoom.split(path.sep).pop();
      const elementName = packageJSON.name + '-' + path.dirname(showRoom).split(path.sep).pop();
      links.push(`<li><a href="${elementName}/${filename}">${elementName}/${filename}</a></li>`)
      links.push(`<li><a href="${elementName}/bundleReport.html">${elementName}/bundleReport.html</a><br/>&nbsp;</li>`)
    })
    returnString = "";
    for (var i = 0, len = links.length; i < len; i++) {
      returnString = returnString.concat(links[i]+ '\n');
    }
    return `${returnString}`
  }
}

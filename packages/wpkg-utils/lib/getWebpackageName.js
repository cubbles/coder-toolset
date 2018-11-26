
const packageJSON = require(`${process.env.INIT_CWD}/package.json`);
const webpackageName = packageJSON.name.replace('@', '').replace('/', '-');;
module.exports = webpackageName;

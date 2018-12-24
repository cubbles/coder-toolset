var shell = require('shelljs');
var path = require('path');
var fs = require('fs-extra');

function exec (command, afterCb) {
  shell.exec(command, function(code, stdout, stderr) {
    console.log('Exit code:', code);
    console.log('Program output:', stdout);
    console.log('Program stderr:', stderr);
    afterCb();
  });
} 

var tempPath =  path.join(__dirname, '../../.temp');
var coderTemplatePath = path.join(__dirname, '../packages/coder-template');
var remoteRepo = 'https://github.com/cubbles/coder-template.git';

fs.emptyDirSync(tempPath);

// 1. No files history (Only one commit is kept, due to force)
// git credentials should be stored locally, e.g. SSH key
var initialCommand = 'cd ' + tempPath + '&& ' +
'git init && git remote add origin ' + remoteRepo + ' && ' +
'git pull origin master  && git rm -r *';

exec(initialCommand, function () {
  fs.copySync(coderTemplatePath, tempPath);
  var finalCommand = 'cd ' + tempPath + '&& git status && ' +
    'git add . && git commit -m "Update coder-template" && ' +
    'git push origin master';

  exec(finalCommand, function () {
    fs.removeSync(tempPath);
  });
});

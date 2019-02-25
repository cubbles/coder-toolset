var shell = require('shelljs');
var path = require('path');
var fs = require('fs-extra');
var inquirer = require('inquirer');

const defaultRepository = 'https://github.com/cubblesmasters/vanilla.git';
const boilerplatePath = '../packages/vanilla-boilerplate/';

function exec(command, afterCb) {
  shell.exec(command, function (code, stdout, stderr) {
    console.log('Exit code:', code);
    console.log('Program output:', stdout);
    console.log('Program stderr:', stderr);
    afterCb();
  });
}

var questions = [{
    name: 'targetRepoUrl',
    type: 'input',
    message: 'Provide the url of the target repository',
    default: defaultRepository
  },
  {
    name: 'commitMessage',
    type: 'input',
    message: 'Provide a message for the commit to be used.',
    default: 'Update coder-template'
  }
];


inquirer.prompt(questions).then(function (answers) {
  updateRepository(answers.targetRepoUrl, answers.commitMessage);
});

function updateRepository(repoUrl, commitMessage) {
  var tempPath = path.join(__dirname, '../../.temp');
  var coderTemplatePath = path.join(__dirname, boilerplatePath);
  fs.emptyDirSync(tempPath);

  // 1. No files history (Only one commit is kept, due to force)
  // git credentials should be stored locally, e.g. SSH key
  var initialCommand = 'cd ' + tempPath + '&& ' +
    'git init && git remote add origin ' + repoUrl + ' && ' +
    'git pull origin master  && git rm -r *';

  exec(initialCommand, function () {
    fs.copySync(coderTemplatePath, tempPath);
    var finalCommand = 'cd ' + tempPath + '&& git status && ' +
      'git add . && git commit -m "' + commitMessage + '" && ' +
      'git push origin master';

    exec(finalCommand, function () {
      fs.removeSync(tempPath);
    });
  });
}
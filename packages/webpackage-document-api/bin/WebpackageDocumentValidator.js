#!/usr/bin/env node
/* eslint-env node */
'use strict';
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const exec = require('child_process').exec;

const WebpackageDocument = require('../lib/WebpackageDocument');
const wpkgUtils = require('@cubbles/wpkg-utils');
const _root = process.env.INIT_CWD;
const manifestPath = path.resolve(_root, 'dist', wpkgUtils.getWebpackageName, 'manifest.webpackage');

const question = [{
  name: 'buildProject',
  type: 'confirm',
  message: 'Do you want to build the webpackage before continuing?',
  default: true
}];

function runDocumentValidation () {
  if (fs.existsSync(manifestPath)) {
    console.log('\x1b[36m', 'Validating the manifest...');
    var manifestDoc = new WebpackageDocument(JSON.parse(fs.readFileSync(manifestPath, 'utf8')));
    var onSuccess = function () {
      console.log('\x1b[32m', 'Your manifest is valid.');
    };
    var onUnsupportedModelVersionError = function (error) {
      throw Error(error);
    };
    var onValidationError = function (errors) {
      errors.forEach(function (error) {
        if (error.dataPath && error.message) {
          // schema validation failed
          console.error('\x1b[31m', 'Validation Error in: ' + error.dataPath);
          console.error('\x1b[0m', error.message);
        } else {
          // rule violation
          console.error(error);
        }
      });
      throw Error('Validation failed.');
    };
    manifestDoc.validate(onSuccess, onUnsupportedModelVersionError, onValidationError);
  } else {
    console.error('\x1b[31m', 'Manifest not found:', manifestPath, 'was not found.');
  }
}

inquirer.prompt(question).then(function (answer) {
  if (answer.buildProject) {
    console.log('\x1b[36m', 'Building the webpackage...');
    exec('npm run build', function (error, stdout, stderr) {
      if (error) {
        console.error('\x1b[31m', 'There was an error building the webpackage.',
        'Thus, the validation will not be performed');
        console.error('\x1b[0m', stderr);
        throw error;
      } else {
        console.log('\x1b[0m', stdout);
        console.log('\x1b[32m', 'Webpackage built successfully');
        runDocumentValidation();
      }
    });
  } else {
    runDocumentValidation();
  }
});

#!/usr/bin/env node
/* eslint-env node */
'use strict';
const fs = require('fs');
const path = require('path');

const WebpackageDocument = require('../lib/WebpackageDocument');
const wpkgUtils = require('@cubbles/wpkg-utils');
const _root = process.env.INIT_CWD;
const manifestPath = path.resolve(_root, 'dist', wpkgUtils.getWebpackageName, 'manifest.webpackage');

if (fs.existsSync(manifestPath)) {
  var manifestDoc = new WebpackageDocument(JSON.parse(fs.readFileSync(manifestPath, 'utf8')));
  var onSuccess = function () {
    console.log('Your manifest is valid.');
  };
  var onUnsupportedModelVersionError = function (error) {
    throw Error(error);
  };
  var onValidationError = function (errors) {
    errors.forEach(function (error) {
      if (error.dataPath && error.message) {
        // schema validation failed
        console.error('Validation Error: ' + error.dataPath + ' >>> ' + error.message);
      } else {
        // rule violation
        console.error(error);
      }
    });
    throw Error('Validation failed.');
  };
  manifestDoc.validate(onSuccess, onUnsupportedModelVersionError, onValidationError);
} else {
  console.error(manifestPath + ' not found.');
}

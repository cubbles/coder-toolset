#!/usr/bin/env node
/* eslint-env node */
'use strict';
var fs = require('fs');
var path = require('path');

var WebpackageDocument = require('../lib/WebpackageDocument');
var providedConfig = process.argv[2];
var _root = process.cwd();
var manifest = {};
var defaultSourcePath = '.';

if (!providedConfig || typeof providedConfig !== 'object') {
  var configFilePath = path.resolve(_root, providedConfig);
  console.log('Using config from file \'' + configFilePath + '\'');
  if (fs.existsSync(configFilePath)) {
    var config = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));
    var sourcePath = config.source || defaultSourcePath;
    var manifestPath = path.resolve(_root, sourcePath, 'manifest.webpackage');
    if (fs.existsSync(manifestPath)) {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } else {
      throw new Error(manifestPath + ' not found.');
    }
  } else {
    throw new Error(configFilePath + ' not found.');
  }
}

var doc = new WebpackageDocument(manifest);
//
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
doc.validate(onSuccess, onUnsupportedModelVersionError, onValidationError);

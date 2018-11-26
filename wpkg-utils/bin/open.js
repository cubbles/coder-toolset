#!/usr/bin/env node

/**
 * Open the browser.
 */

const opn = require('opn');
const find = require('find');
const path = require('path');

(function (timeout = 500, browser = 'chrome') {
  setTimeout(function (timeout) {
    const wpkgName = require('../lib/getWebpackageName')
    opn(`http://localhost:4000/${wpkgName}/index.html`, { app: browser });
  }, 3000);
}());

const assert = require('assert');

module.exports = (webpackageName) => {
  assert.ok(webpackageName, 'Expected "webpackageName" to be defined.');
  return {
    description: 'Demo utility',
    resources: [
      'c-util.bundle.js'
    ]
  };
};

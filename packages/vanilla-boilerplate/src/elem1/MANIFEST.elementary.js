const assert = require('assert');

module.exports = (webpackageName) => {
  assert.ok(webpackageName, 'Expected "webpackageName" to be defined.');
  return {
    description: 'A simple elementary component.',
    slots: [
      { slotId: 'message', type: 'string', direction: ['input', 'output'] }
    ],
    resources: [
      'element.html'
    ],
    runnables: [
      {
        name: 'SHOWROOM',
        path: '/SHOWROOM.html'
      }
    ],
    dependencies: [
      { webpackageId: 'cubx.core.rte@3.0.0-SNAPSHOT', artifactId: 'cubxcomponent' },
      { artifactId: `${webpackageName}-utility-green-style` }
    ]
  };
};

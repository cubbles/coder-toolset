const assert = require('assert');

module.exports = webpackageName => {
  assert.ok(webpackageName, 'Expected "webpackageName" to be defined.');
  return {
    description: 'A simple compound component.',
    resources: ['element.html'],
    runnables: [
      {
        name: 'SHOWROOM',
        path: '/SHOWROOM.html'
      }
    ],
    dependencies: [{ artifactId: `${webpackageName}-elem1` }],
    slots: [
      { slotId: 'outerMessage', type: 'string', direction: ['input', 'output'] }
    ],
    // member declarations
    members: [
      { artifactId: `${webpackageName}-elem1`, memberId: 'first' },
      { artifactId: `${webpackageName}-elem1`, memberId: 'second' }
    ],
    // connection declarations
    connections: [
      {
        connectionId: 'compound-message-to-first-message',
        source: { slot: 'outerMessage' },
        destination: { memberIdRef: 'first', slot: 'message' }
      },
      {
        connectionId: 'first-message-to-second-message',
        source: { memberIdRef: 'first', slot: 'message' },
        destination: { memberIdRef: 'second', slot: 'message' }
      },
      {
        connectionId: 'second-message-to-compound-message',
        source: { memberIdRef: 'second', slot: 'message' },
        destination: { slot: 'message' }
      }
    ]
  };
};

const webpackageName = require('./../../package.json').name;

module.exports = {
  description: "A simple elementary component.",
  slots: [
    { slotId: "message", type: "string", direction: ["input", "output"] }
  ],
  resources: [
    "element.html"
  ],
  dependencies: [
    { webpackageId: "cubx.core.rte@3.0.0-SNAPSHOT", artifactId: "cubxcomponent" },
    { artifactId: `${webpackageName}-utility-green-style` }
  ]
};

const path = require('path')
module.exports = {
  rootDir: path.resolve(__dirname, './'),
  moduleFileExtensions: [
    'js',
  ],
  testMatch: [
    '**/src/**/*.spec.(js)|**/__tests__/*.(js)'
  ],
  testURL: 'http://localhost/',
  collectCoverage: Boolean(process.env.coverage),
  collectCoverageFrom: [
    "src/**/*.js",
    "!**/node_modules/**"
  ],
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "testconfig.js",
    "package.json",
    "package-lock.json"
  ],
  coverageReporters: [
    "html",
    "text",
    "json-summary"
  ],
  reporters: [
    ["jest-nyan-reporter", {
      "suppressErrorReporter": false
    }]
  ]
}


if (process.env.noNyan) {
  console.log('Disable nyan')
  delete module.exports.reporters
}

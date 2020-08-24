require('module-alias/register');
require('@babel/register')({
  presets: [[
    '@babel/preset-env',
    { targets: { node: 8 } },
  ]],
  babelrc: false,
});

const video = require('wdio-video-reporter');

const config = {
  // Setup the browser window
  before: function (capabilities, specs) {
    browser.setWindowPosition(0, 0);
    browser.setWindowSize(1320, 768);
  },


  // ===============
  // Custom settings
  // ===============
  logLevel: 'info', // trace | debug | info | warn | error | silent
  outputDir: './_results_',
  reporters: [
    'spec',
    [video, {
      saveAllVideos: true,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
      videoRenderTimeout: 5,      // Max seconds to wait for a video to finish rendering
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    }],
  ],



  // ============
  // Capabilities
  // ============
  services: [
    'selenium-standalone',
  ],
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
      acceptInsecureCerts : true,
    },
    {
      maxInstances: 1,
      browserName: 'firefox',
      acceptInsecureCerts : true,
    },
  ],



  // ==================
  // Some nice defaults
  // ==================
  specs: [
    './src/specs/**/*.e2e.js',
  ],
  deprecationWarnings: true,
  maxInstances: 10,
  sync: true,
  coloredLogs: true,
  bail: 1,
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 100000,
    expectationResultHandler: function(passed, assertion) {
    }
  },
};

module.exports = {
  config,
};

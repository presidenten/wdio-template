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
      saveAllVideos: false,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
      videoRenderTimeout: 5,      // Max seconds to wait for a video to finish rendering
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
      useCucumberStepReporter: true,
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
  deprecationWarnings: true,
  maxInstances: 10,
  sync: true,
  coloredLogs: true,
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  // =================
  // Cucumber settings
  // =================
  specs: [
    './src/**/*.feature',
  ],
  framework: 'cucumber',
  cucumberOpts: {
    requireModule: ['@babel/register'],
    require: ['./src/**/*.steps.js'],
    backtrace: false,
    compiler: [],
    dryRun: false,
    failFast: false,
    format: ['pretty'],
    colors: true,
    snippets: true,
    source: true,
    profile: [],
    strict: false,
    tagExpression: [],
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },
};

module.exports = {
  config,
};


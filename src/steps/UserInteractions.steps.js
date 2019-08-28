import { Given, When, Then } from 'cucumber';
import assert from 'assert';
import config from '@/config/e2e.js';
import selectors from '@/helpers/selectors.js';

Given(/^I navigate to base url$/, () => {
  browser.url(config.url);
});

Given(/^I open Basic Examples tab$/, () => {
  $(selectors.basicExamples).click();
  browser.pause(300); // avoid animation effect
});

Given(/^I open Advanced Examples tab$/, () => {
  $(selectors.advancedExamples).click();
  browser.pause(300); // avoid animation effect
});

When(/I open '(.+)' demo$/, (demo) => {
  $(selectors.getExampleButtonByTarget(demo)).click();
});

When(/I enter message '(.+)'$/, (message) => {
  $('#get-input input').setValue(message);

});

When(/I click 'Show Message'$/, () => {
  $('#get-input button').click();
  $('#get-input button').click();
});

Then(/My message '(.+)' should be displayed$/, (message) => {
  let name = $('#user-message #display').getText();
  assert.equal(name, message);
});

When(/I click first slider$/, () => {
  $('#slider1 input').click();
});

Then(/Slider range should be '(.+)'$/, (expected) => {
  let range = $('#slider1 #range').getText();
  assert.equal(range, expected);
});

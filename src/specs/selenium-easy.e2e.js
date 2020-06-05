import config from '@/config/e2e.js';
import selectors from '@/helpers/selectors.js';

describe('User interactions', () => {
  beforeEach(() => {
    browser.url(config.url);
    const lightbox = '#at-cv-lightbox-close';
    if ($(lightbox).isExisting()) {
      $(lightbox).click();
    }
  });

  it ('should be able to edit input (should pass)', () => {
    $(selectors.basicExamples).click();
    browser.pause(300); // avoid animation effect

    $(selectors.getExampleButtonByTarget('basic-first-form-demo')).click();

    $('#get-input input').setValue('Presidenten');
    $('#get-input button').click();
    $('#get-input button').click();

    let name = $('#user-message #display').getText();

    expect(name).toBe('Presidenten');
  });


  it('should be able to move slider (fails by design to gen video)', () => {
    $(selectors.advancedExamples).click();
    browser.pause(300); // avoid animation effect
    $(selectors.getExampleButtonByTarget('drag-drop-range')).click();

    $('#slider1 input').click();

    let range = $('#slider1 #range').getText();
    expect(range).toBe(30);
  });

  it('should be able to multi-select in dropdown (fails by design to gen video)', () => {
    $(selectors.basicExamples).click();
    browser.pause(300); // avoid animation effect

    $(selectors.getExampleButtonByTarget('basic-select-dropdown')).click();
    browser.execute(function() { document.querySelector('#multi-select').scrollIntoView(true); });

    const isDevice = browser.capabilities.deviceType;
    let modifierKey = 'Control';

    if (!isDevice) {
      if (browser.capabilities.platform === 'macOS' || browser.capabilities.platformName === 'macOS') {
        modifierKey = 'Meta';
      }

      browser.keys(modifierKey);
    }

    browser.execute(function() { document.querySelector('#multi-select').scrollIntoView(true); });
    $('select#multi-select option[value="Florida"]').click();
    $('select#multi-select option[value="Ohio"]').click();
    $('select#multi-select option[value="Texas"]').click();

    if (!isDevice) {
      browser.keys(modifierKey);
    }

    $('button#printAll').click();
    browser.pause(300);
    const values = $('.getall-selected').getText();
    expect(values.includes('Florida')).toBe(true);
    expect(values.includes('Ohio')).toBe(true);
    expect(values.includes('Texas')).toBe(true);
  });
});


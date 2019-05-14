
/*
  Simulate mouse actions through javascript. Works from IE10+.

  Use this lib to avoid the current gecko-driver bugs that prevents `positionClick` and 
  mouse operations through `performActions`.

  Usage
  ```
  import mouse from '@/config/mouse

  // Click an element
  mouse(browser, selector, 'click'); 
  // Click with an offset to selectors topleft position
  mouse(browser, selector, 'click', { x: 200, y: 200 });
  // Click an element with shift
  mouse(browser, selector, 'click', { shiftKey: true }); 
  // Click an element with meta
  mouse(browser, selector, 'click', { metaKey: true }); 
  ```

  The possible defaultOptions are: 
  {
    x: 0,
    y: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
  }
 */


export default (browser, selector, eventName, eventOptions) => {
  eventOptions = eventOptions || {};
  $(selector).waitForDisplayed();

  const result = browser.execute((selector, eventName, eventOptions) => {    
    // DO NOT UPDATE TO ES6!! This will execute in the browsers
    function extend(destination, source) {
      for (var property in source)
        destination[property] = source[property];
      return destination;
    }

    var eventMatchers = {
      'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
      'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
    };
    var defaultOptions = {
      x: 0,
      y: 0,
      button: 0,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      bubbles: true,
      cancelable: true
    };
    var element = document.querySelector(selector);
    
    var options = extend(defaultOptions, eventOptions || {});
    var oEvent, eventType = null;
    
    var elementRect = element.getBoundingClientRect();
    options.x = options.x + elementRect.left;
    options.y = options.y + elementRect.top;

    var newElement = document.elementFromPoint(options.x, options.y);

    for (var name in eventMatchers) {
      if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType)
      throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent) {
      oEvent = document.createEvent(eventType);
      if (eventType == 'HTMLEvents') {
          oEvent.initEvent(eventName, options.bubbles, options.cancelable);
      } else{
          oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
          options.button, options.x, options.y, options.x, options.y,
          options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, newElement);
      }
      newElement.dispatchEvent(oEvent);
    } else {
      options.clientX = options.x;
      options.clientY = options.y;
      var evt = document.createEventObject();
      oEvent = extend(evt, options);
      newElement.fireEvent('on' + eventName, oEvent);
    }
    return newElement;
  }, selector, eventName, eventOptions);

  return result;
};

'use strict';

(function () {
  var AMOUNT_ADVERTS = 5;
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var LEFT_BUTTON = 0;
  var DEBOUNCE_INTERVAL = 500;

  var debounce = function (cb) {
    var lastTimeout;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomElementArray = function (array) {
    return array[getRandomInteger(0, array.length - 1)];
  };

  var getRandomLengthArray = function (array) {
    return array.slice(getRandomInteger(0, array.length - 1));
  };

  var setAttributeCollection = function (collection, active) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].disabled = active;
    }
  };

  window.utils = {
    debounce: debounce,
    getRandomInteger: getRandomInteger,
    getRandomElementArray: getRandomElementArray,
    getRandomLengthArray: getRandomLengthArray,
    setAttributeCollection: setAttributeCollection,
    amountAdverts: AMOUNT_ADVERTS,
    keys: {
      enter: ENTER_KEY,
      esc: ESC_KEY,
      leftButton: LEFT_BUTTON
    }
  };
})();

'use strict';

(function () {
  var AMOUNT_ADVERTS = 5;
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var LEFT_BUTTON = 0;

  // функция возвращает случайное целое число от min(вкл) до max(вкл)
  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // функция возвращает случайный элемент массива
  var getRandomElementArray = function (array) {
    return array[getRandomInteger(0, array.length - 1)];
  };

  // функция возвращает случайную длину массива
  var getRandomLengthArray = function (array) {
    return array.slice(getRandomInteger(0, array.length - 1));
  };

  // управляет атрибутом disabled элементов коллекции
  var setAttributeCollection = function (collection, active) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].disabled = active;
    }
  };

  window.utils = {
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

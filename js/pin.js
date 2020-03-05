'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var templatePin = document.querySelector('#pin');
  var mapPinTemplate = templatePin.content.querySelector('.map__pin');
  var pinsList = document.querySelector('.map__pins');

  // функция создает метки объявлений
  var createPinElement = function (pin) {
    var pinElement = mapPinTemplate.cloneNode(true);
    pinElement.style = 'left: ' + (pin.location.x - PIN_WIDTH / 2) + 'px; top: ' + (pin.location.y - PIN_HEIGHT) + 'px;';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;
    return pinElement;
  };

  // функция отрисовывает сгенерированные метки на карте
  var renderPins = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.adverts.length; i++) {
      fragment.appendChild(createPinElement(array[i]));
    }
    pinsList.appendChild(fragment);
  };

  window.pins = {
    renderPins: renderPins
  };
})();

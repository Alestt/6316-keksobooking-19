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
  var renderPins = function (data) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (item) {
      fragment.appendChild(createPinElement(item));
    });
    pinsList.appendChild(fragment);
  };

  // удаляет метки похожих объявлений
  var deletePins = function () {
    var pins = pinsList.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (item) {
      item.remove();
    });
  };

  window.pin = {
    render: renderPins,
    deleteAll: deletePins
  };
})();

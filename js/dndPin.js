'use strict';

(function () {
  var MainPinData = {
    sizes: {
      WIDTH: 65,
      HEIGHT: 65,
      HEIGHT_AND_TAIL: 87
    },
    verticalRange: {
      Y_MIN: 130,
      Y_MAX: 630
    }
  };

  var map = document.querySelector('.map');
  var pinsList = document.querySelector('.map__pins');
  var mapPinMain = pinsList.querySelector('.map__pin--main');

  // записывает изначальные координаты главной метки
  var startCoordinates = {
    x: mapPinMain.offsetLeft,
    y: mapPinMain.offsetTop,
  };

  // возвращает главную метку в исходное положение
  var returnStartPositionPinMain = function () {
    mapPinMain.style.top = startCoordinates.y + 'px';
    mapPinMain.style.left = startCoordinates.x + 'px';
  };

  // определяет координаты главной метки
  var getPinMainCoordinates = function (active) {
    var pinMainCoordinates = {
      x: Math.round(mapPinMain.offsetLeft + MainPinData.sizes.WIDTH / 2),
      y: Math.round(mapPinMain.offsetTop + MainPinData.sizes.HEIGHT / 2)
    };
    if (active === true) {
      pinMainCoordinates = {
        x: Math.round(mapPinMain.offsetLeft + MainPinData.sizes.WIDTH / 2),
        y: Math.round(mapPinMain.offsetTop + MainPinData.sizes.HEIGHT_AND_TAIL)
      };
    }
    return pinMainCoordinates;
  };

  // добавляет обработчик события mousedown (Drag & Drop главной метки)
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // записывает начальные координаты главной метки
    var startPosition = {
      x: evt.clientX,
      y: evt.clientY
    };

    // функция-обработчик перемещает главную метку
    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();

      // определяет текущие координаты главной метки
      var currentPosition = {
        x: startPosition.x - evtMove.clientX,
        y: startPosition.y - evtMove.clientY
      };

      // перезаписывает начальные координаты на текущие
      startPosition = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };

      // хранит координаты при перемещении метки
      var newPosition = {
        x: mapPinMain.offsetLeft - currentPosition.x,
        y: mapPinMain.offsetTop - currentPosition.y
      };

      // координаты при минимальных ограничениях размещения метки
      var minLimitCoordinates = {
        x: -mapPinMain.clientWidth / 2,
        y: MainPinData.verticalRange.Y_MIN - MainPinData.sizes.HEIGHT_AND_TAIL
      };

      // координаты при максимальных ограничениях размещения метки
      var maxLimitCoordinates = {
        x: map.clientWidth - mapPinMain.clientWidth / 2,
        y: MainPinData.verticalRange.Y_MAX - MainPinData.sizes.HEIGHT_AND_TAIL
      };

      // создаёт условия по размещению метки по горизонтали
      if (newPosition.x < minLimitCoordinates.x || newPosition.x > maxLimitCoordinates.x) {
        newPosition.x = mapPinMain.offsetLeft;
      }

      // создаёт условия по размещению метки по вертикали
      if (newPosition.y < minLimitCoordinates.y || newPosition.y > maxLimitCoordinates.y) {
        newPosition.y = mapPinMain.offsetTop;
      }

      mapPinMain.style.left = newPosition.x + 'px';
      mapPinMain.style.top = newPosition.y + 'px';

      window.form.setAddressInput(getPinMainCoordinates(true));
    };

    // функция-обработчик прекращает перемещение главной метки
    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.dndPin = {
    getMainCoordinates: getPinMainCoordinates,
    returnStartPosition: returnStartPositionPinMain
  };
})();

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

  var startCoordinates = {
    x: mapPinMain.offsetLeft,
    y: mapPinMain.offsetTop,
  };

  var returnStartPositionPinMain = function () {
    mapPinMain.style.top = startCoordinates.y + 'px';
    mapPinMain.style.left = startCoordinates.x + 'px';
  };

  var getPinMainCoordinates = function (active) {
    var pinMainCoordinates = {
      x: Math.round(mapPinMain.offsetLeft + MainPinData.sizes.WIDTH / 2),
      y: Math.round(mapPinMain.offsetTop + MainPinData.sizes.HEIGHT / 2)
    };

    if (active) {
      pinMainCoordinates = {
        x: Math.round(mapPinMain.offsetLeft + MainPinData.sizes.WIDTH / 2),
        y: Math.round(mapPinMain.offsetTop + MainPinData.sizes.HEIGHT_AND_TAIL)
      };
    }

    return pinMainCoordinates;
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startPosition = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();

      var currentPosition = {
        x: startPosition.x - evtMove.clientX,
        y: startPosition.y - evtMove.clientY
      };

      startPosition = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };

      var newPosition = {
        x: mapPinMain.offsetLeft - currentPosition.x,
        y: mapPinMain.offsetTop - currentPosition.y
      };

      var minLimitCoordinates = {
        x: -mapPinMain.clientWidth / 2,
        y: MainPinData.verticalRange.Y_MIN - MainPinData.sizes.HEIGHT_AND_TAIL
      };

      var maxLimitCoordinates = {
        x: map.clientWidth - mapPinMain.clientWidth / 2,
        y: MainPinData.verticalRange.Y_MAX - MainPinData.sizes.HEIGHT_AND_TAIL
      };

      if (newPosition.x < minLimitCoordinates.x || newPosition.x > maxLimitCoordinates.x) {
        newPosition.x = mapPinMain.offsetLeft;
      }

      if (newPosition.y < minLimitCoordinates.y || newPosition.y > maxLimitCoordinates.y) {
        newPosition.y = mapPinMain.offsetTop;
      }

      mapPinMain.style.left = newPosition.x + 'px';
      mapPinMain.style.top = newPosition.y + 'px';
      window.form.setAddressInput(getPinMainCoordinates(true));
    };

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

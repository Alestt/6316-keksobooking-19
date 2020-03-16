'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var pinsList = document.querySelector('.map__pins');
  var mapFilter = document.querySelector('.map__filters');
  var mapFilters = mapFilter.children;
  var mapPinMain = pinsList.querySelector('.map__pin--main');
  var roomNumber = adForm.querySelector('#room_number');
  var typeHouse = adForm.querySelector('#type');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var adFieldsets = adForm.querySelectorAll('fieldset');

  var onPinMainMousedown = function (evt) {
    if (evt.button === window.utils.keys.leftButton) {
      startActivePage();
    }
  };

  var onPinMainKeydown = function (evt) {
    if (evt.key === window.utils.keys.enter) {
      startActivePage();
    }
  };

  var startActivePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.utils.setAttributeCollection(adFieldsets, false);
    window.utils.setAttributeCollection(mapFilters, false);
    mapPinMain.removeEventListener('mousedown', onPinMainMousedown);
    mapPinMain.removeEventListener('keydown', onPinMainKeydown);
    window.filter.form();
    window.card.render();
    window.form.setAddressInput(window.dndPin.getMainCoordinates(true));
    window.form.getAmountGuests();
    window.form.getMinPrice();
    roomNumber.addEventListener('change', window.form.onInputRoomChange);
    typeHouse.addEventListener('change', window.form.onInputTypeHouseChange);
    timeIn.addEventListener('change', window.form.onTimeInChange);
    timeOut.addEventListener('change', window.form.onTimeOutChange);
  };

  var activateCard = function () {
    var pins = pinsList.querySelectorAll('.map__pin');
    var activeCard = map.querySelector('.map__card');
    var pinActive;

    var activatePin = function (element) {
      deleteActivePin();
      pinActive = element;
      pinActive.classList.add('map__pin--active');
    };

    var deleteActivePin = function () {
      if (pinActive) {
        pinActive.classList.remove('map__pin--active');
      }
    };

    var closeCard = function () {
      var popupClose = activeCard.querySelector('.popup__close');

      var onPopupCloseClick = function () {
        activeCard.classList.add('hidden');
        popupClose.removeEventListener('click', onPopupCloseClick);
        document.removeEventListener('keydown', onPopupCloseEsc);
        deleteActivePin();
      };

      var onPopupCloseEsc = function (evt) {
        if (evt.key === window.utils.keys.esc) {
          activeCard.classList.add('hidden');
          popupClose.removeEventListener('click', onPopupCloseClick);
          document.removeEventListener('keydown', onPopupCloseEsc);
          deleteActivePin();
        }
      };

      popupClose.addEventListener('click', onPopupCloseClick);
      document.addEventListener('keydown', onPopupCloseEsc);
    };

    var onPinsClick = function (i) {
      return function () {
        activeCard.classList.remove('hidden');
        window.card.createElement(window.filter.array[i]);
        activatePin(pins[i + 1]);
        closeCard();
      };
    };

    var onPinsEnter = function (i) {
      return function (evt) {
        if (evt.key === window.utils.keys.enter) {
          activeCard.classList.remove('hidden');
          window.card.createElement(window.filter.array[i]);
          activatePin(pins[i + 1]);
        }
      };
    };

    for (var j = 0; j < window.filter.array.slice(0, window.utils.amountAdverts).length; j++) {
      pins[j + 1].addEventListener('click', onPinsClick(j));
      pins[j + 1].addEventListener('click', onPinsEnter(j));
    }
  };

  var beginPage = function () {
    window.utils.setAttributeCollection(adFieldsets, true);
    window.utils.setAttributeCollection(mapFilters, true);
    mapPinMain.addEventListener('mousedown', onPinMainMousedown);
    mapPinMain.addEventListener('keydown', onPinMainKeydown);
    window.form.setAddressInput(window.dndPin.getMainCoordinates(false));
  };

  var returnBeginPage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.pin.deleteAll();
    window.card.deleteAll();
    window.dndPin.returnStartPosition();
    window.form.reset();
    window.filter.reset();
    beginPage();
  };

  beginPage();

  window.map = {
    returnBeginPage: returnBeginPage,
    activateCard: activateCard
  };
})();

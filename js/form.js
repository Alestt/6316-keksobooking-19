'use strict';

(function () {
  var ROOMS_CAPACITY = {1: [1], 2: [1, 2], 3: [1, 2, 3], 100: [0]};

  var adForm = document.querySelector('.ad-form');
  var addressInput = adForm.querySelector('#address');
  var capacity = adForm.querySelector('#capacity');
  var capacityOptions = capacity.querySelectorAll('option');
  var roomNumber = adForm.querySelector('#room_number');
  var typeHouse = adForm.querySelector('#type');
  var typeHouseToMinPrice = {bungalo: 0, flat: 1000, house: 5000, palace: 10000};
  var minPrice = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

  // записывает координаты главной метки в поле ввода адреса
  var setAddressInput = function (coordinates) {
    addressInput.value = coordinates.x + ', ' + coordinates.y;
    addressInput.disabled = true;
  };

  // синхронизирует поле «Количество комнат» с полем «Количество мест»
  var getAmountGuests = function () {
    window.utils.setAttributeCollection(capacityOptions, true);
    var selectedOptions = ROOMS_CAPACITY[roomNumber.value];
    for (var i = 0; i < selectedOptions.length; i++) {
      var option = capacity.querySelector('option[value="' + selectedOptions[i] + '"]');
      option.removeAttribute('disabled');
      option.setAttribute('selected', 'selected');
    }
  };

  // функция-обработчик, вызывающая функцию синхронизации поля «Количество комнат» с полем «Количество мест»
  var onInputRoomChange = function () {
    getAmountGuests();
  };

  // синхронизирует поле «Тип жилья» с полем «Цена за ночь, руб.»
  var getMinPrice = function () {
    minPrice.min = typeHouseToMinPrice[typeHouse.value];
    minPrice.placeholder = typeHouseToMinPrice[typeHouse.value];
  };

  // функция-обработчик, вызывающая функцию синхронизации поля «Тип жилья» с полем «Цена за ночь, руб.»
  var onInputTypeHouseChange = function () {
    getMinPrice();
  };

  // синхронизирует поля «Время заезда и выезда»
  var getTimeInToTimeOut = function () {
    timeOut.value = timeIn.value;
  };

  var onTimeInChange = function () {
    getTimeInToTimeOut();
  };

  var getTimeOutToTimeIn = function () {
    timeIn.value = timeOut.value;
  };

  var onTimeOutChange = function () {
    getTimeOutToTimeIn();
  };

  window.form = {
    setAddressInput: setAddressInput,
    getAmountGuests: getAmountGuests,
    getMinPrice: getMinPrice,
    onInputRoomChange: onInputRoomChange,
    onInputTypeHouseChange: onInputTypeHouseChange,
    onTimeInChange: onTimeInChange,
    onTimeOutChange: onTimeOutChange
  };
})();

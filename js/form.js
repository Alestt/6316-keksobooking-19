'use strict';

(function () {
  var RoomsCapacity = {1: [1], 2: [1, 2], 3: [1, 2, 3], 100: [0]};
  var TypeHouseToMinPrice = {bungalo: 0, flat: 1000, house: 5000, palace: 10000};
  var AmountGuests = {one: '1', two: '2', three: '3', zero: '0'};
  var AmountRooms = {one: '1', two: '2', three: '3', hundred: '100'};
  var adForm = document.querySelector('.ad-form');
  var addressInput = adForm.querySelector('#address');
  var capacity = adForm.querySelector('#capacity');
  var capacityOptions = capacity.querySelectorAll('option');
  var roomNumber = adForm.querySelector('#room_number');
  var typeHouse = adForm.querySelector('#type');
  var minPrice = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var resetButton = adForm.querySelector('.ad-form__reset');

  // записывает координаты главной метки в поле ввода адреса
  var setAddressInput = function (coordinates) {
    addressInput.value = coordinates.x + ', ' + coordinates.y;
    addressInput.setAttribute('readonly', 'readonly');
  };

  // показывает подсказку при неправильно выбранном количестве гостей
  var showHelpAmountGuests = function () {
    capacity.setCustomValidity('');
    switch (roomNumber.value) {
      case AmountRooms.one:
        if (capacity.value !== AmountGuests.one) {
          capacity.setCustomValidity('Только для 1 гостя');
        }
        break;
      case AmountRooms.two:
        if (capacity.value !== AmountGuests.one && capacity.value !== AmountGuests.two) {
          capacity.setCustomValidity('Только для 1 или 2 гостей');
        }
        break;
      case AmountRooms.three:
        if (capacity.value !== AmountGuests.one && capacity.value !== AmountGuests.two && capacity.value !== AmountGuests.three) {
          capacity.setCustomValidity('Только для 1, 2 или 3 гостей');
        }
        break;
      case AmountRooms.hundred:
        if (capacity.value !== AmountGuests.zero) {
          capacity.setCustomValidity('Не для гостей');
        }
        break;
    }
    capacity.reportValidity();
  };

  // синхронизирует поле «Количество комнат» с полем «Количество мест»
  var getAmountGuests = function () {
    window.utils.setAttributeCollection(capacityOptions, true);
    var selectedOptions = RoomsCapacity[roomNumber.value];
    selectedOptions.forEach(function (it) {
      var option = capacity.querySelector('option[value="' + it + '"]');
      option.removeAttribute('disabled');
      option.setAttribute('selected', 'selected');
    });
  };

  // функция-обработчик, вызывающая функцию синхронизации поля «Количество комнат» с полем «Количество мест»
  var onInputRoomChange = function () {
    getAmountGuests();
    showHelpAmountGuests();
  };

  // синхронизирует поле «Тип жилья» с полем «Цена за ночь, руб.»
  var getMinPrice = function () {
    minPrice.min = TypeHouseToMinPrice[typeHouse.value];
    minPrice.placeholder = TypeHouseToMinPrice[typeHouse.value];
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

  // сбрасывает форму
  var resetForm = function () {
    adForm.reset();
  };

  // возвращает страницу в неактивное состояние и показывает успешное сообщение
  var onSuccess = function () {
    window.map.returnBeginPage();
    window.success.showMessage();
  };

  // показывает сообщение об ошибке
  var onError = function () {
    window.error.showMessage();
  };

  // при нажатии на кнопку очистить, сбрасывает страницу в исходное состояние
  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.map.returnBeginPage();
  });

  // отправляет данные формы на сервер и убирает действие по умолчанию
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(adForm);
    window.backend.upload(formData, onSuccess, onError);
  });

  window.form = {
    setAddressInput: setAddressInput,
    getAmountGuests: getAmountGuests,
    getMinPrice: getMinPrice,
    onInputRoomChange: onInputRoomChange,
    onInputTypeHouseChange: onInputTypeHouseChange,
    onTimeInChange: onTimeInChange,
    onTimeOutChange: onTimeOutChange,
    reset: resetForm
  };
})();

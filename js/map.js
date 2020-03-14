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

  // функция-обработчик, вызывающая функцию перевода страницы в активное состояние
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

  // функция переводит страницу в активное состояние
  var startActivePage = function () {
    // удаляет у карты и формы класс неактивного состояния
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    // убирает у элементов форм атрибут disabled
    window.utils.setAttributeCollection(adFieldsets, false);
    window.utils.setAttributeCollection(mapFilters, false);
    // удаляет обработчик события mousedown/keydown
    mapPinMain.removeEventListener('mousedown', onPinMainMousedown);
    mapPinMain.removeEventListener('keydown', onPinMainKeydown);
    // добавляет фильтрацию
    window.filter.form();
    // отрисовывает шаблон карточки объявления
    window.card.render();
    // записывает координаты главной метки в поле ввода адреса в активном состоянии страницы
    window.form.setAddressInput(window.dndPin.getPinMainCoordinates(true));
    // при активации страницы синхронизирует поле «Количество комнат» с полем «Количество мест»
    window.form.getAmountGuests();
    // при активации страницы синхронизирует поле «Тип жилья» с полем «Цена за ночь, руб.»
    window.form.getMinPrice();
    // при изменении поля «Количество комнат» синхронизирует с полем «Количество мест»
    roomNumber.addEventListener('change', window.form.onInputRoomChange);
    // при изменении поля «Тип жилья» синхронизирует с полем «Цена за ночь, руб.»
    typeHouse.addEventListener('change', window.form.onInputTypeHouseChange);
    // при изменении полей «Время заезда и выезда» синхронизирует время заезда и выезда
    timeIn.addEventListener('change', window.form.onTimeInChange);
    timeOut.addEventListener('change', window.form.onTimeOutChange);
  };

  var activateCard = function () {
    var pins = pinsList.querySelectorAll('.map__pin');
    var activeCard = map.querySelector('.map__card');
    var pinActive;

    // выделяет активную метку
    var activatePin = function (element) {
      deleteActivePin();
      pinActive = element;
      pinActive.classList.add('map__pin--active');
    };

    // снимает выделение метки
    var deleteActivePin = function () {
      if (pinActive) {
        pinActive.classList.remove('map__pin--active');
      }
    };

    // закрывает активную карточку похожего объявления
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

    // функция-обработчик, вызывающая заполнение/показ карточки объявления, выделение активной метки
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

    // добавляет обработчики событий меткам, пропуская главную метку
    for (var j = 0; j < window.filter.array.slice(0, window.utils.amountAdverts).length; j++) {
      pins[j + 1].addEventListener('click', onPinsClick(j));
      pins[j + 1].addEventListener('click', onPinsEnter(j));
    }
  };

  // функция задаёт неактивное состояние страницы
  var beginPage = function () {
    // добавляет элементам форм атрибут disabled
    window.utils.setAttributeCollection(adFieldsets, true);
    window.utils.setAttributeCollection(mapFilters, true);
    // добавляет обработчик события mousedown/keydown
    mapPinMain.addEventListener('mousedown', onPinMainMousedown);
    mapPinMain.addEventListener('keydown', onPinMainKeydown);
    // записывает координаты главной метки в поле ввода адреса в неактивном состоянии страницы
    window.form.setAddressInput(window.dndPin.getPinMainCoordinates(false));
  };

  // функция возвращает к начальному состоянию страницы
  var returnBeginPage = function () {
    // добавляет карте и форме неактивное состояние
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    // удаляет метки и карточки похожих объявлений
    window.pin.deleteAll();
    window.card.deleteAll();
    // возвращает главную метку в исходное положение
    window.dndPin.returnStartPosition();
    // сбрасывает форму
    window.form.reset();
    // сбрасывает фильтры
    window.filter.reset();
    beginPage();
  };

  beginPage();

  window.map = {
    returnBeginPage: returnBeginPage,
    activateCard: activateCard
  };
})();

'use strict';

// создает данные
var AMOUNT_ADVERT = 8;
var TITLES = ['Luxurious palace', 'Mini palace', 'Flat in loft-style', 'Big apartment', 'Modern house', 'House in the centre of the city', 'Nice bungalow', 'Little bungalow'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MIN_HEIGHT = 130;
var MAX_HEIGHT = 630;
var MIN_PRICE = 1000;
var MAX_PRICE = 100000;
var MIN_ROOM = 1;
var MAX_ROOM = 4;
var MIN_GUEST = 1;
var MAX_GUEST = 3;
var CHECKIN_CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Comfortable, bright and super-centrally located.', 'A relaxing flat for two.', 'This is a bright and fun space.', 'PERFECT for adventurous travellers!', 'Ideal for families, couples or business partners.'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_SIZE = 65;
var MAIN_PIN_SIZE_TAIL = 22;
var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';
var LEFT_BUTTON = 0;
var ROOMS_CAPACITY = {1: [1], 2: [1, 2], 3: [1, 2, 3], 100: [0]};
var offerTypes = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
var offerPhotos = {class: 'popup__photo', width: 45, height: 40, alt: 'Фотография жилья'};
var typeHouseToMinPrice = {bungalo: 0, flat: 1000, house: 5000, palace: 10000};

// определяет ширину блока
var maxWidth = document.querySelector('.map').clientWidth;

// главная часть страницы документа
var map = document.querySelector('.map');

// шаблон
var templatePin = document.querySelector('#pin');
var templateCard = document.querySelector('#card');

// часть шаблона
var mapPinTemplate = templatePin.content.querySelector('.map__pin');
var mapCardTemplate = templateCard.content.querySelector('.map__card');

// оъект DOM, содержащий список маркеров
var pinsList = document.querySelector('.map__pins');

// блок перед которым надо вставить карточку объявления
var filtersContainer = map.querySelector('.map__filters-container');

var adForm = document.querySelector('.ad-form');
var adFieldsets = adForm.querySelectorAll('fieldset');
var mapFilter = document.querySelector('.map__filters');
var mapFilters = mapFilter.children;
var mapPinMain = pinsList.querySelector('.map__pin--main');
var addressInput = adForm.querySelector('#address');
var roomNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');
var capacityOptions = capacity.querySelectorAll('option');
var typeHouse = adForm.querySelector('#type');
var minPrice = adForm.querySelector('#price');
var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');

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

// функция создает массив объектов объявлений
var getRandomAdvert = function () {
  var adverts = [];
  for (var i = 0; i < AMOUNT_ADVERT; i++) {
    var coordinate = {
      x: getRandomInteger(0, maxWidth),
      y: getRandomInteger(MIN_HEIGHT, MAX_HEIGHT),
    };

    adverts[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: getRandomElementArray(TITLES),
        address: coordinate.x + ', ' + coordinate.y
      },
      price: getRandomInteger(MIN_PRICE, MAX_PRICE),
      type: getRandomElementArray(TYPES),
      rooms: getRandomInteger(MIN_ROOM, MAX_ROOM),
      guests: getRandomInteger(MIN_GUEST, MAX_GUEST),
      checkin: getRandomElementArray(CHECKIN_CHECKOUT_TIMES),
      checkout: getRandomElementArray(CHECKIN_CHECKOUT_TIMES),
      features: getRandomLengthArray(FEATURES),
      description: getRandomElementArray(DESCRIPTIONS),
      photos: getRandomLengthArray(PHOTOS),
      location: {
        x: coordinate.x,
        y: coordinate.y
      }
    };
  }
  return adverts;
};

var adverts = getRandomAdvert();

// 1. функция создает метки объявлений
var createPinElement = function (pin) {
  var pinElement = mapPinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (pin.location.x - PIN_WIDTH / 2) + 'px; top: ' + (pin.location.y - PIN_HEIGHT) + 'px;';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  return pinElement;
};

// функция создает новое удобство
var makeFeatureElement = function (modifier) {
  var newFeatureElement = document.createElement('li');
  newFeatureElement.classList.add('popup__feature', 'popup__feature--' + modifier);
  return newFeatureElement;
};

// функция создает новое фото
var makePhotoElement = function (path) {
  var newPhotoElement = document.createElement('img');
  newPhotoElement.src = path;
  newPhotoElement.classList.add(offerPhotos.class);
  newPhotoElement.style.width = offerPhotos.width + 'px';
  newPhotoElement.style.height = offerPhotos.height + 'px';
  newPhotoElement.alt = offerPhotos.alt;
  return newPhotoElement;
};

// 2. функция наполняет карточки объявлений нужной инф-ей
var createCardElement = function (card) {
  var cardElement = map.querySelector('.map__card');
  var popupClose = cardElement.querySelector('.popup__close');
  var featureParent = cardElement.querySelector('.popup__features');
  var featureItems = featureParent.querySelectorAll('.popup__feature');
  var photoParent = cardElement.querySelector('.popup__photos');
  var photoItems = photoParent.querySelectorAll('.popup__photo');
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = offerTypes[card.type];
  cardElement.querySelector('.popup__text--capacity').textContent = card.rooms + ' комнаты для ' + card.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.checkin + ', выезд до ' + card.checkout;
  cardElement.querySelector('.popup__description').textContent = card.description;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  for (var i = 0; i < featureItems.length; i++) {
    featureItems[i].style.display = 'none';
  }
  card.features.forEach(function (item) {
    featureParent.appendChild(makeFeatureElement(item));
  });

  for (var j = 0; j < photoItems.length; j++) {
    photoItems[j].style.display = 'none';
  }
  card.photos.forEach(function (item) {
    photoParent.appendChild(makePhotoElement(item));
  });

  var onPopupCloseClick = function () {
    cardElement.classList.add('hidden');
    popupClose.removeEventListener('click', onPopupCloseClick);
    document.removeEventListener('keydown', onPopupCloseEsc);
  };

  var onPopupCloseEsc = function (evt) {
    if (evt.key === ESC_KEY) {
      cardElement.classList.add('hidden');
      popupClose.removeEventListener('click', onPopupCloseClick);
      document.removeEventListener('keydown', onPopupCloseEsc);
    }
  };

  popupClose.addEventListener('click', onPopupCloseClick);
  document.addEventListener('keydown', onPopupCloseEsc);
  return cardElement;
};

// функция отрисовывает сгенерированные метки на карте
var renderPins = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < AMOUNT_ADVERT; i++) {
    fragment.appendChild(createPinElement(array[i]));
  }
  pinsList.appendChild(fragment);
};

// функция отрисовывает шаблон карточки объявлений
var renderCard = function () {
  var cardCloned = mapCardTemplate.cloneNode(true);
  cardCloned.classList.add('hidden');
  var fragment = document.createDocumentFragment();
  fragment.appendChild(cardCloned);
  map.insertBefore(fragment, filtersContainer);
};

// управляет атрибутом disabled элементов коллекции
var setAttributeCollection = function (collection, active) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].disabled = active;
  }
};

// определяем координаты главной метки
var getPinMainCoordinates = function (active) {
  var pinMainCoordinates = {
    x: Math.round(mapPinMain.offsetLeft + MAIN_PIN_SIZE / 2),
    y: Math.round(mapPinMain.offsetTop + MAIN_PIN_SIZE / 2)
  };
  if (active === true) {
    pinMainCoordinates = {
      x: Math.round(mapPinMain.offsetLeft + MAIN_PIN_SIZE / 2),
      y: Math.round(mapPinMain.offsetTop + MAIN_PIN_SIZE + MAIN_PIN_SIZE_TAIL)
    };
  }
  return pinMainCoordinates;
};

// записывает координаты главной метки в поле ввода адреса
var setAddressInput = function (coordinates) {
  addressInput.value = coordinates.x + ', ' + coordinates.y;
  addressInput.disabled = true;
};

// синхронизирует поле «Количество комнат» с полем «Количество мест»
var getAmountGuests = function () {
  setAttributeCollection(capacityOptions, true);
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

// функция-обработчик, вызывающая функцию перевода страницы в активное состояние
var onPinMainMousedown = function (evt) {
  if (evt.button === LEFT_BUTTON) {
    startActivePage();
  }
};

var onPinMainKeydown = function (evt) {
  if (evt.key === ENTER_KEY) {
    startActivePage();
  }
};

// функция переводит страницу в активное состояние
var startActivePage = function () {
  // удаляет у карты и формы класс неактивного состояния
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  // убирает у элементов форм атрибут disabled
  setAttributeCollection(adFieldsets, false);
  setAttributeCollection(mapFilters, false);
  // удаляет обработчик события mousedown/keydown
  mapPinMain.removeEventListener('mousedown', onPinMainMousedown);
  mapPinMain.removeEventListener('keydown', onPinMainKeydown);
  // отрисовывает метки на карте
  renderPins(adverts);
  // отрисовывает шаблон карточки объявления
  renderCard();
  // записывает координаты главной метки в поле ввода адреса в активном состоянии страницы
  setAddressInput(getPinMainCoordinates(true));
  // при активации страницы синхронизирует поле «Количество комнат» с полем «Количество мест»
  getAmountGuests();
  // при активации страницы синхронизирует поле «Тип жилья» с полем «Цена за ночь, руб.»
  getMinPrice();
  // при изменении поля «Количество комнат» синхронизирует с полем «Количество мест»
  roomNumber.addEventListener('change', onInputRoomChange);
  // при изменении поля «Тип жилья» синхронизирует с полем «Цена за ночь, руб.»
  typeHouse.addEventListener('change', onInputTypeHouseChange);
  // при изменении полей «Время заезда и выезда» синхронизирует время заезда и выезда
  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);

  var pins = pinsList.querySelectorAll('.map__pin');
  var activeCard = map.querySelector('.map__card');
  var pinActive;
  // выделяет активную метку
  var activetePin = function (element) {
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

  // функция-обработчик, вызывающая заполнение/показ карточки объявления, выделение активной метки
  var onPinsClick = function (i) {
    return function () {
      createCardElement(adverts[i]);
      activetePin(pins[i + 1]);
      activeCard.classList.remove('hidden');
    };
  };

  var onPinsEnter = function (i) {
    return function (evt) {
      if (evt.key === ENTER_KEY) {
        createCardElement(adverts[i]);
        activetePin(pins[i + 1]);
        activeCard.classList.remove('hidden');
      }
    };
  };

  // добавляет обработчики событий меткам, пропуская главную метку
  for (var j = 0; j < AMOUNT_ADVERT; j++) {
    pins[j + 1].addEventListener('click', onPinsClick(j));
    pins[j + 1].addEventListener('click', onPinsEnter(j));
  }
};

// функция задаёт начальное состояние страницы
var beginPage = function () {
  // добавляет элементам форм атрибут disabled
  setAttributeCollection(adFieldsets, true);
  setAttributeCollection(mapFilters, true);
  // добавляет обработчик события mousedown/keydown
  mapPinMain.addEventListener('mousedown', onPinMainMousedown);
  mapPinMain.addEventListener('keydown', onPinMainKeydown);
  // записывает координаты главной метки в поле ввода адреса в неактивном состоянии страницы
  setAddressInput(getPinMainCoordinates(false));
};

beginPage();

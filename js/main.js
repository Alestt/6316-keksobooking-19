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
var offerTypes = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
var offerPhotos = {class: 'popup__photo', width: 45, height: 40, alt: 'Фотография жилья'};

// определяет ширину блока
var maxWidth = document.querySelector('.map').clientWidth;

// главная часть страницы документа
var map = document.querySelector('.map');
map.classList.remove('map--faded');

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

// 1. функция создает метки объявлений
var createPinElement = function (pin) {
  var pinElement = mapPinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (pin.location.x - PIN_WIDTH / 2) + 'px; top: ' + (pin.location.y - PIN_HEIGHT) + 'px;';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  return pinElement;
};

// функция удаляет все дочерние элементы
var removeChildElements = function (element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
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

// 2. функция создает карточки объявлений
var createCardElement = function (card) {
  var cardElement = mapCardTemplate.cloneNode(true);
  var photoParent = cardElement.querySelector('.popup__photos');
  var featureParent = cardElement.querySelector('.popup__features');
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = offerTypes[card.type];
  cardElement.querySelector('.popup__text--capacity').textContent = card.rooms + ' комнаты для ' + card.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.checkin + ', выезд до ' + card.checkout;
  removeChildElements(featureParent);
  card.features.forEach(function (item) {
    featureParent.appendChild(makeFeatureElement(item));
  });
  cardElement.querySelector('.popup__description').textContent = card.description;
  removeChildElements(photoParent);
  card.photos.forEach(function (item) {
    photoParent.appendChild(makePhotoElement(item));
  });
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  return cardElement;
};

// функция отрисовывает сгенерированные метки и карточку объявления на карте
var renderElement = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < AMOUNT_ADVERT; i++) {
    fragment.appendChild(createPinElement(array[i]));
  }
  pinsList.appendChild(fragment);
  map.insertBefore(createCardElement(array[0]), filtersContainer);
};

var adverts = getRandomAdvert();
renderElement(adverts);

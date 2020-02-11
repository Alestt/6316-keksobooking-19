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

// массив объектов недвижимости
var adverts = [];

// определяет ширину блока
var maxWidth = document.querySelector('.map').clientWidth;

// главная часть страницы документа
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// шаблон
var template = document.querySelector('#pin');

// часть шаблона - маркер на карте Токио
var mapPinTemplate = template.content.querySelector('.map__pin');

// оъект DOM, содержащий список маркеров
var pinsList = document.querySelector('.map__pins');

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
  for (var i = 0; i < AMOUNT_ADVERT; i++) {
    var coordinate = {
      x: getRandomInteger(0, maxWidth, true),
      y: getRandomInteger(MIN_HEIGHT, MAX_HEIGHT),
    };

    adverts[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },
      offer: {
        title: getRandomElementArray(TITLES),
        address: coordinate.x + ', ' + coordinate.y,
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

// функция создает DOM-элемент, соответствующиЙ меткам на карте
var createPinElement = function (pin) {
  var pinElement = mapPinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (pin.location.x - PIN_WIDTH / 2) + 'px; top: ' + (pin.location.y - PIN_HEIGHT) + 'px;';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  return pinElement;
};

// функция отрисовывает сгенерированные DOM-элементы
var renderPin = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < AMOUNT_ADVERT; i++) {
    fragment.appendChild(createPinElement(adverts[i]));
  }
  pinsList.appendChild(fragment);
};

getRandomAdvert();
renderPin();

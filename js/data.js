'use strict';

(function () {
  var AMOUNT_ADVERT = 8;
  var TITLES = ['Luxurious palace', 'Mini palace', 'Flat in loft-style', 'Big apartment', 'Modern house', 'House in the centre of the city', 'Nice bungalow', 'Little bungalow'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['Comfortable, bright and super-centrally located.', 'A relaxing flat for two.', 'This is a bright and fun space.', 'PERFECT for adventurous travellers!', 'Ideal for families, couples or business partners.'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MIN_HEIGHT = 130;
  var MAX_HEIGHT = 630;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 100000;
  var MIN_ROOM = 1;
  var MAX_ROOM = 4;
  var MIN_GUEST = 1;
  var MAX_GUEST = 3;
  var CHECKIN_CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];

  // определяет ширину блока
  var maxWidth = document.querySelector('.map').clientWidth;

  // функция создает массив объектов объявлений
  var getRandomAdvert = function () {
    var adverts = [];
    for (var i = 0; i < AMOUNT_ADVERT; i++) {
      var coordinate = {
        x: window.utils.getRandomInteger(0, maxWidth),
        y: window.utils.getRandomInteger(MIN_HEIGHT, MAX_HEIGHT),
      };

      adverts[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: window.utils.getRandomElementArray(TITLES),
          address: coordinate.x + ', ' + coordinate.y
        },
        price: window.utils.getRandomInteger(MIN_PRICE, MAX_PRICE),
        type: window.utils.getRandomElementArray(TYPES),
        rooms: window.utils.getRandomInteger(MIN_ROOM, MAX_ROOM),
        guests: window.utils.getRandomInteger(MIN_GUEST, MAX_GUEST),
        checkin: window.utils.getRandomElementArray(CHECKIN_CHECKOUT_TIMES),
        checkout: window.utils.getRandomElementArray(CHECKIN_CHECKOUT_TIMES),
        features: window.utils.getRandomLengthArray(FEATURES),
        description: window.utils.getRandomElementArray(DESCRIPTIONS),
        photos: window.utils.getRandomLengthArray(PHOTOS),
        location: {
          x: coordinate.x,
          y: coordinate.y
        }
      };
    }
    return adverts;
  };

  var adverts = getRandomAdvert();

  window.data = {
    amountAdvert: AMOUNT_ADVERT,
    adverts: adverts
  };
})();

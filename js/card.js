'use strict';

(function () {
  var offerPhotos = {class: 'popup__photo', width: 45, height: 40, alt: 'Фотография жилья'};
  var offerTypes = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};

  var map = document.querySelector('.map');
  var templateCard = document.querySelector('#card');
  var mapCardTemplate = templateCard.content.querySelector('.map__card');
  // блок перед которым надо вставить карточку объявления
  var filtersContainer = map.querySelector('.map__filters-container');

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
    var featureParent = cardElement.querySelector('.popup__features');
    var featureItems = featureParent.querySelectorAll('.popup__feature');
    var photoParent = cardElement.querySelector('.popup__photos');
    var photoItems = photoParent.querySelectorAll('.popup__photo');
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = offerTypes[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    for (var i = 0; i < featureItems.length; i++) {
      featureItems[i].style.display = 'none';
    }
    card.offer.features.forEach(function (item) {
      featureParent.appendChild(makeFeatureElement(item));
    });

    for (var j = 0; j < photoItems.length; j++) {
      photoItems[j].style.display = 'none';
    }
    card.offer.photos.forEach(function (item) {
      photoParent.appendChild(makePhotoElement(item));
    });

    return cardElement;
  };

  // функция отрисовывает шаблон карточки объявлений
  var renderCard = function () {
    var cardCloned = mapCardTemplate.cloneNode(true);
    cardCloned.classList.add('hidden');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(cardCloned);
    map.insertBefore(fragment, filtersContainer);
  };

  // удаляет карточки похожих объявлений
  var deleteCards = function () {
    var cards = map.querySelectorAll('.map__card');
    for (var i = 0; i < cards.length; i++) {
      cards[i].remove();
    }
  };

  var hideCard = function () {
    var activeCard = map.querySelector('.map__card');
    activeCard.classList.add('hidden');
  };

  window.card = {
    render: renderCard,
    createElement: createCardElement,
    deleteAll: deleteCards,
    hide: hideCard
  };
})();

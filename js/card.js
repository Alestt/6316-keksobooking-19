'use strict';

(function () {
  var OfferPhotos = {class: 'popup__photo', width: 45, height: 40, alt: 'Фотография жилья'};
  var OfferTypes = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
  var map = document.querySelector('.map');
  var templateCard = document.querySelector('#card');
  var mapCardTemplate = templateCard.content.querySelector('.map__card');
  var filtersContainer = map.querySelector('.map__filters-container');

  var makeFeatureElement = function (modifier) {
    var newFeatureElement = document.createElement('li');
    newFeatureElement.classList.add('popup__feature', 'popup__feature--' + modifier);
    return newFeatureElement;
  };

  var makePhotoElement = function (path) {
    var newPhotoElement = document.createElement('img');
    newPhotoElement.src = path;
    newPhotoElement.classList.add(OfferPhotos.class);
    newPhotoElement.style.width = OfferPhotos.width + 'px';
    newPhotoElement.style.height = OfferPhotos.height + 'px';
    newPhotoElement.alt = OfferPhotos.alt;
    return newPhotoElement;
  };

  var createCardElement = function (card) {
    var cardElement = map.querySelector('.map__card');
    var featureParent = cardElement.querySelector('.popup__features');
    var featureItems = featureParent.querySelectorAll('.popup__feature');
    var photoParent = cardElement.querySelector('.popup__photos');
    var photoItems = photoParent.querySelectorAll('.popup__photo');
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = OfferTypes[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    featureItems.forEach(function (featureItem) {
      featureItem.style.display = 'none';
    });
    card.offer.features.forEach(function (item) {
      featureParent.appendChild(makeFeatureElement(item));
    });
    photoItems.forEach(function (photoItem) {
      photoItem.style.display = 'none';
    });
    card.offer.photos.forEach(function (item) {
      photoParent.appendChild(makePhotoElement(item));
    });
    return cardElement;
  };

  var renderCard = function () {
    var cardCloned = mapCardTemplate.cloneNode(true);
    cardCloned.classList.add('hidden');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(cardCloned);
    map.insertBefore(fragment, filtersContainer);
  };

  var deleteCards = function () {
    var cards = map.querySelectorAll('.map__card');
    cards.forEach(function (item) {
      item.remove();
    });
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

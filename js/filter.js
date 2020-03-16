'use strict';
(function () {
  var PriceRange = {low: {MIN: 0, MAX: 9999}, middle: {MIN: 10000, MAX: 50000}, high: {MIN: 50000, MAX: Infinity}};
  var map = document.querySelector('.map');
  var filter = map.querySelector('.map__filters');
  var filterType = filter.querySelector('#housing-type');
  var filterPrice = filter.querySelector('#housing-price');
  var filterRooms = filter.querySelector('#housing-rooms');
  var filterGuests = filter.querySelector('#housing-guests');
  var filterFeatures = filter.querySelector('#housing-features');
  var filteredArray = [];

  var selectFilterElement = function (element, rate, item) {
    return element.value === 'any' ? true : element.value === item[rate].toString();
  };

  var selectFilterType = function (item) {
    return selectFilterElement(filterType, 'type', item.offer);
  };

  var selectFilterPrice = function (item) {
    var priceValue = PriceRange[filterPrice.value];
    return priceValue ? item.offer.price >= priceValue.MIN && item.offer.price <= priceValue.MAX : true;
  };

  var selectFilterRooms = function (item) {
    return selectFilterElement(filterRooms, 'rooms', item.offer);
  };

  var selectFilterGuests = function (item) {
    return selectFilterElement(filterGuests, 'guests', item.offer);
  };

  var selectFilterFeatures = function (item) {
    var checkedElement = filterFeatures.querySelectorAll('input:checked');
    return Array.from(checkedElement).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  var filteredFormFields = function () {
    filteredArray = window.data.adverts;
    filteredArray = filteredArray.filter(function (item) {
      return selectFilterType(item) && selectFilterPrice(item) && selectFilterRooms(item) && selectFilterGuests(item) && selectFilterFeatures(item);
    });
    window.filter.array = filteredArray;
  };

  var onFormElementChange = function () {
    window.utils.debounce(function () {
      filteredFormFields();
      window.card.hide();
      window.pin.deleteAll();
      window.pin.render(filteredArray.slice(0, window.utils.amountAdverts));
      window.map.activateCard();
    });
  };

  filter.addEventListener('change', onFormElementChange);

  var resetFilters = function () {
    filter.reset();
  };

  window.filter = {
    form: onFormElementChange,
    reset: resetFilters,
  };
})();

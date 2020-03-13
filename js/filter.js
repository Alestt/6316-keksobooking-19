'use strict';
(function () {
  var map = document.querySelector('.map');
  var filtersContainer = map.querySelector('.map__filters-container');
  var filterType = filtersContainer.querySelector('#housing-type');
  var filteredArray = [];

  var selectFilterType = function () {
    filteredArray.length = 0;
    window.pin.deleteAll();
    var filterElement = function (item) {
      return filterType.value === 'any' ? true : filterType.value === item.offer.type;
    };
    window.data.adverts.forEach(function (it) {
      if (filterElement(it)) {
        filteredArray.push(it);
      }
    });
    window.pin.render(filteredArray.slice(0, window.utils.amountAdverts));
  };

  var onFilterTypeChange = function () {
    selectFilterType();
    window.map.activateCard();
    window.card.hide();
  };

  filterType.addEventListener('change', onFilterTypeChange);

  var resetFilters = function () {
    filterType.value = 'any';
  };

  window.filter = {
    array: filteredArray,
    selectType: selectFilterType,
    reset: resetFilters,
  };
})();

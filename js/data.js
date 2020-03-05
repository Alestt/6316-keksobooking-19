'use strict';

(function () {

  var adverts = [];

  var onLoad = function (data) {
    for (var i = 0; i < data.length; i++) {
      adverts.push(data[i]);
    }
  };

  window.backend.load(onLoad, window.error.showMessage);

  window.data = {
    adverts: adverts
  };
})();

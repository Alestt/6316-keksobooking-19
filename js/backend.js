'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {OK: 200};
  var UrlTypes = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };

  var createXHR = function (data, method, url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(method, url);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    createXHR('', 'GET', UrlTypes.LOAD, onLoad, onError);
  };

  var upload = function (data, onLoad, onError) {
    createXHR(data, 'POST', UrlTypes.UPLOAD, onLoad, onError);
  };

  window.backend = {
    load: load,
    upload: upload
  };
})();

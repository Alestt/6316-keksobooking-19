'use strict';

(function () {
  var StatusCode = {OK: 200};
  var UrlTypes = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };
  var TIMEOUT_IN_MS = 10000;

  var createXHR = function (data, method, url, onLoad, onError) {
    // создаёт новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    // добавляет обработчик события load
    xhr.addEventListener('load', function () {
      // выполняет проверку статуса запроса
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    // добавляет обработчик события error
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    // добавляет обработчик события timeout
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    // открывает запрос
    xhr.open(method, url);

    // отправляет данные
    xhr.send(data);
  };

  // получение данных с сервера
  var load = function (onLoad, onError) {
    createXHR('', 'GET', UrlTypes.LOAD, onLoad, onError);
  };

  // отправляет данные формы на сервер
  var upload = function (data, onLoad, onError) {
    createXHR(data, 'POST', UrlTypes.UPLOAD, onLoad, onError);
  };

  // создаёт объект в глобальной ОВ
  window.backend = {
    load: load,
    upload: upload
  };
})();

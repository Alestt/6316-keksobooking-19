'use strict';

(function () {
  var StatusCode = {OK: 200};
  var TIMEOUT_IN_MS = 10000;

  var load = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';

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
    xhr.open('GET', URL);

    // отправляет данные
    xhr.send();
  };

  // создаёт объект в глобальной ОВ
  window.backend = {
    load: load
  };
})();

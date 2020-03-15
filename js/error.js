'use strict';

(function () {
  var showMessage = function () {
    var templateError = document.querySelector('#error');
    var messageError = templateError.content.querySelector('.error');
    var messageErrorActive = messageError.cloneNode(true);
    var closeButton = messageErrorActive.querySelector('.error__button');
    var main = document.querySelector('main');

    main.appendChild(messageErrorActive);

    var onCloseButtonClick = function () {
      messageErrorActive.classList.add('hidden');
      closeButton.removeEventListener('click', onCloseButtonClick);
      document.removeEventListener('keydown', onDocumentKeydown);
      document.removeEventListener('click', onDocumentClick);
    };

    // скрывает успешное сообщение при нажатии на esc
    var onDocumentKeydown = function (evt) {
      if (evt.key === window.utils.keys.esc) {
        messageErrorActive.classList.add('hidden');
        closeButton.removeEventListener('click', onCloseButtonClick);
        document.removeEventListener('keydown', onDocumentKeydown);
        document.removeEventListener('click', onDocumentClick);
      }
    };

    // скрывает успешное сообщение по клику на произвольную область экрана
    var onDocumentClick = function () {
      messageErrorActive.classList.add('hidden');
      closeButton.removeEventListener('click', onCloseButtonClick);
      document.removeEventListener('keydown', onDocumentKeydown);
      document.removeEventListener('click', onDocumentClick);
    };

    closeButton.removeEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('click', onDocumentClick);
  };

  window.error = {
    showMessage: showMessage
  };
})();

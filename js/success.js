'use strict';

(function () {
  var showMessage = function () {
    var templateSuccess = document.querySelector('#success');
    var messageSuccess = templateSuccess.content.querySelector('.success');
    var messageSuccessActive = messageSuccess.cloneNode(true);

    document.body.appendChild(messageSuccessActive);

    var onDocumentKeydown = function (evt) {
      if (evt.key === window.utils.keys.esc) {
        messageSuccessActive.classList.add('hidden');
        document.removeEventListener('keydown', onDocumentKeydown);
        document.removeEventListener('click', onDocumentClick);
      }
    };

    var onDocumentClick = function () {
      messageSuccessActive.classList.add('hidden');
      document.removeEventListener('keydown', onDocumentKeydown);
      document.removeEventListener('click', onDocumentClick);
    };

    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('click', onDocumentClick);
  };

  window.success = {
    showMessage: showMessage
  };
})();

'use strict';

(function () {
  var showMessage = function (text) {
    var timeout = 5000;
    var node = document.createElement('div');
    node.classList.add('error');
    node.textContent = text;
    document.body.insertAdjacentElement('afterbegin', node);

    var hideMessage = function () {
      node.remove();
    };
    setTimeout(hideMessage, timeout);
  };

  window.error = {
    showMessage: showMessage
  };
})();

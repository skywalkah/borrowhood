/* eslint-disable no-unused-vars */
const showToast = ({ message }) => {
  const toastBody = document.querySelector('.toast-body');
  toastBody.textContent = message;
  const toast = document.querySelector('#liveToast');
  // eslint-disable-next-line no-undef
  const myToast = new bootstrap.Toast(toast, { autohide: true });
  myToast.show();
};

const showAlert = ({ target, message, type }) => {
  const alertContainer = document.querySelector(`#${target}`);
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>',
  ].join('');

  alertContainer.append(wrapper);
};

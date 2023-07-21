import {isEscapeKey} from './utils.js';

const successMessage = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');


const closeSuccessMessage = () => {
  successMessage.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const closeErrorMessage = () => {
  errorMessage.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if ((isEscapeKey(evt))) {
    evt.preventDefault();
    closeSuccessMessage();
  }
}

const showSuccessMessage = () => {
  document.body.append(successMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  const successButton = successMessage.querySelector('.success__button');
  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('click', (evt) => {
    if (!successButton.contains(evt.target)) {
      closeSuccessMessage();
    }
  });
};

const showErrorMessage = () => {
  document.body.append(errorMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('click', (evt) => {
    if (!errorButton.contains(evt.target)) {
      closeErrorMessage();
    }
  });
};

export {showSuccessMessage, showErrorMessage};

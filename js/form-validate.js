import {resetScale} from './image-scale.js';
import {resetSlider} from './image-effects.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import {sendData} from './api.js';
import {isEscapeKey} from './utils.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const imageUpload = document.querySelector('.img-upload__overlay');
const cancelUpload = document.querySelector('#upload-cancel');
const hashtagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');
const imgInProcess = document.querySelector('.img-upload__effect-level');
const submitButtonSwitch = document.querySelector('.img-upload__submit');
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};
const MAX_COMMENT_LENGTH = 140;
const MAX_NUMBER_HASHTAG = 5;

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
});

const closeUploadPhoto = () => {
  const errorContainer = document.querySelector('.error');

  if (errorContainer && !errorContainer.className.includes('hidden')) {
    document.querySelector('.error').classList.add('hidden');
  } else {
    imageUpload.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }

  document.removeEventListener('keydown', onDocumentKeydown);
  imageUploadForm.reset();
  pristine.reset();
  resetScale();
  resetSlider();
};

function onDocumentKeydown (evt) {
  if (
    isEscapeKey
  && !(document.activeElement === hashtagField)
  && !(document.activeElement === descriptionField)
  && !document.body.classList.contains('has-error')) {
    evt.preventDefault();
    closeUploadPhoto();
  }
}
const showUploadPhoto = () => {
  imageUpload.classList.remove('hidden');
  imgInProcess.classList.add('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

function validateCommentInput (value) {
  return value.length <= MAX_COMMENT_LENGTH;
}
const getHashtags = () => hashtagField.value
  .split(' ')
  .filter((hashtag) => hashtag.length > 0);
function validateHashtagFormatInput () {
  const hashtags = getHashtags();
  for (let i = 0; i < hashtags.length; i++) {
    if (!HASHTAG_PATTERN.test(hashtags[i])) {
      return false;
    }
  }
  return true;
}
function validateHashtagCountInput () {
  const hashtags = getHashtags();
  return hashtags.length <= MAX_NUMBER_HASHTAG;
}
function validateHashtagDouble () {
  const hashtags = getHashtags();
  const lowerCaseArr = hashtags.map((word) => word.toLowerCase());
  const isHashtagsDuplicate = new Set(lowerCaseArr);
  return isHashtagsDuplicate.size === hashtags.length;
}

const blockSubmitButton = () => {
  submitButtonSwitch.disabled = true;
  submitButtonSwitch.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonSwitch.disabled = false;
  submitButtonSwitch.textContent = SubmitButtonText.IDLE;
};

const setFormSubmit = (callback) => {
  imageUploadForm.addEventListener('submit', async(evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      callback(new FormData(imageUploadForm));
    }
  });
};

const setupFormValidation = () => {
  pristine.addValidator(descriptionField, validateCommentInput, 'Допустимое количество знаков не больше 140!');
  pristine.addValidator(hashtagField, validateHashtagFormatInput, 'Неправильный формат хэштэга');
  pristine.addValidator(hashtagField, validateHashtagCountInput, 'Можно использовать не более пяти хэш-тегов');
  pristine.addValidator(hashtagField, validateHashtagDouble, 'Хэш-теги не должны повторяться');
  uploadFile.addEventListener('change', () => showUploadPhoto());
  cancelUpload.addEventListener('click', () => closeUploadPhoto());

  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (!isValid) {
      return;
    }

    sendData(new FormData(evt.target))
      .then(() => {
        closeUploadPhoto();
        showSuccessMessage();
      })
      .catch(showErrorMessage);
  });
};

export {setupFormValidation, unblockSubmitButton, setFormSubmit};

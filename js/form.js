import {resetScale} from './scale.js';
import {resetSlider} from './effects.js';
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
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_COMMENT_LENGTH = 140;
const MAX_NUMBER_HASHTAG = 5;

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
});

const closeUploadPhoto = () => {
  imageUpload.classList.add('hidden');
  document.body.classList.remove('modal-open');
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
  const isHashtagsDuplicate = new Set(hashtags);
  return isHashtagsDuplicate.size === hashtags.length;
}

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

export {setupFormValidation};

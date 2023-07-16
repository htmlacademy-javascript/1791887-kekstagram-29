import { renderComments, clearComments } from './comment.js';
import {isEscapeKey} from './utils.js';

const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const userModalCloseElement = bigPicture.querySelector('.cancel');

const renderPictureData = ({url, description, likes}) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
};

const onDocumentEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const toggleModalClasses = (willBeOpened = true) => {
  bigPicture.classList.toggle('hidden', !willBeOpened);
  body.classList.toggle('modal-open', willBeOpened);
};

function closeUserModal () {
  toggleModalClasses(false);

  clearComments();
}

userModalCloseElement.addEventListener('click', () => closeUserModal ());


const showBigPicture = (data) => {
  toggleModalClasses(true);

  document.addEventListener('keydown', onDocumentEscapeKeydown);
  renderPictureData(data);
  renderComments(data.comments);
};

export {showBigPicture};

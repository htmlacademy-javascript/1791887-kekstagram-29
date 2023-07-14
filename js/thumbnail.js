import { getTemplate } from './utils.js';
import { showBigPicture } from './big-picture.js';
import { getPhotoById, photos } from './data.js';

const template = getTemplate('picture');
const container = document.querySelector('.pictures');


/**
 * @param {Event} evt
 */
const onThumbnailClick = (evt) => {
  evt.preventDefault();
  const thumbnail = evt.currentTarget;
  const id = +thumbnail.dataset.thumbnailId;
  const picture = getPhotoById(id);

  showBigPicture(picture);
};


const renderThumbnail = ({comments, description, likes, url, id}) => {
  const thumbnail = template.cloneNode(true);

  const imageElement = thumbnail.querySelector('.picture__img');
  imageElement.src = url;
  imageElement.alt = description;

  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = renderThumbnail(picture);
    thumbnail.addEventListener('click', onThumbnailClick);
    fragment.append(thumbnail);
  });

  container.append(fragment);
};

renderThumbnails(photos);

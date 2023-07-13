const thumbnailTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createThumbnail = ({comments, description, likes, url}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const imageElement = thumbnail.querySelector('.picture__img');
  imageElement.src = url;
  imageElement.alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;

  return thumbnail;
};

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  container.append(fragment);
};

export {renderThumbnails};

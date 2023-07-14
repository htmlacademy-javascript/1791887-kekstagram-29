import {getTemplate} from './utils.js';

//const COMMENTS_PACK_SIZE = 5;
const template = getTemplate('comment');
const commentList = document.querySelector('.social__comments');
const commentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

commentsCount.classList.remove('hidden');
commentsLoader.classList.remove('hidden');

const renderComment = (comment) => {
  const newComment = template.cloneNode(true);
  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__text').textContent = comment.message;
  commentList.append(newComment);
};

const updateCommentIndicator = (showed, allAmount) => {
  commentsCount.textContent = `${showed} из ${allAmount} комментариев`;
};

const renderComments = (comments) => {
  commentList.innerHTML = '';
  comments.forEach(renderComment);
  updateCommentIndicator(comments.length, comments.length);

  //	commentsLoader.classList.add('hidden');
};

const clearComments = () => {
  commentList.innerHTML = '';
};

export {renderComments, clearComments};

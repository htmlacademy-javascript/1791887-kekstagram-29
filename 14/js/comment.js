import {getTemplate, renderPack} from './utils.js';

const COMMENTS_PACK_SIZE = 5;
const template = getTemplate('comment');
const commentList = document.querySelector('.social__comments');
const commentsCount = document.querySelector('.social__comment-count');
const loadButton = document.querySelector('.social__comments-loader');

let savedComment = [];


const renderComment = (comment) => {
  const newComment = template.cloneNode(true);
  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__text').textContent = comment.message;
  return newComment;
};

const onLoadButtonClick = () => {
  const allCommentsAmount = savedComment.length;
  const showedAmount = commentList.children.length;
  let endOfSlice = showedAmount + COMMENTS_PACK_SIZE;
  const allCommentsShow = endOfSlice >= allCommentsAmount;

  endOfSlice = allCommentsShow ? allCommentsAmount : endOfSlice;

  const slicedComments = savedComment.slice(showedAmount, endOfSlice);

  renderPack(commentList, slicedComments, renderComment);

  commentsCount.textContent = `${endOfSlice} из ${allCommentsAmount} комментариев`;

  loadButton.hidden = allCommentsShow;
};

loadButton.addEventListener('click', onLoadButtonClick);

const renderComments = (comments) => {
  savedComment = comments;
  loadButton.click();
};

const clearComments = () => {
  commentList.innerHTML = '';
  savedComment = [];
};

export {renderComments, clearComments};

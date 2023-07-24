import { renderThumbnails } from './thumbnail.js';
import { debounce } from './utils.js';

const FILTER_RANDOM_PICTURES_COUNT = 10;

const TIMEOUT = 500;

const imgFilters = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const filterDefault = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const filterMostDiscussed = document.querySelector('#filter-discussed');

const filterPictures = (pictures, sortButton) => {

  if (sortButton === filterDefault) {
    return pictures;
  }

  if (sortButton === randomFilter) {
    return pictures.slice().sort(() => Math.random() - 0.5).slice(0, FILTER_RANDOM_PICTURES_COUNT);
  }

  if (sortButton === filterMostDiscussed) {
    return pictures.slice().sort((a, b) => b.comments.length - a.comments.length);
  }
};

const removePictures = (pictures) => pictures.forEach((thumbnail) => thumbnail.remove());

const setOnFilterClick = (evt, pictures) => {

  filterDefault.classList.remove('img-filters__button--active');
  randomFilter.classList.remove('img-filters__button--active');
  filterMostDiscussed.classList.remove('img-filters__button--active');

  const filterButton = evt.target;
  filterButton.classList.add('img-filters__button--active');
  const thumbnails = document.querySelectorAll('.picture');

  removePictures(thumbnails);

  renderThumbnails (filterPictures(pictures, filterButton));
};

const setDebouncedSort = (pictures) => {
  filterForm.addEventListener('click', debounce((evt) => {
    setOnFilterClick(evt, pictures);
  }, TIMEOUT));
};

const showFilters = () => imgFilters.classList.remove('img-filters--inactive');

export { setDebouncedSort, showFilters };

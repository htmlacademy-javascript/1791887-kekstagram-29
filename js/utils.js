/**
 * @param {number} a
 * @param {number} b
 * @returns случайное целое число из переданного диапазона включительно
 */
const getRandomInteger = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
/**
 * @param {Array<Type>} array
 * @returns случайный элемент массива
 */
const getRandomArrayElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];
/**
 * Использует замыкание для генерации id
 * @returns генератор id
 */
const createIdGenerator = () => {
  let lastGenerateId = 0;
  return () => {
    lastGenerateId += 1;
    return lastGenerateId;
  };
};

/**
 *
 * @param {Element} wrapper
 * @param {Array<T>} dataItems
 * @param {(item: T) => Element} renderFunction
 */
const renderPack = (wrapper, data, renderFunction) => {

  const fragment = document.createDocumentFragment();
  for (const item of data) {
    fragment.append(renderFunction(item));
  }
  wrapper.append(fragment);
};

/**
 *
 * @param {KeyboardEvent} evt
 */
const isEscapeKey = ({key}) => key === 'Escape';

/**
 * ищет шаблон по id и берет из него 1й элемент
 * @param {string} id
 * @returns {HTMLElement}
 */
const getTemplate = (id) => document.getElementById(id).content.firstElementChild;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '10';
  alertContainer.style.position = 'absolute';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 5px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.backgroundColor = 'white';
  alertContainer.style.color = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomInteger, getRandomArrayElement, createIdGenerator, isEscapeKey, getTemplate, renderPack, showAlert, debounce};

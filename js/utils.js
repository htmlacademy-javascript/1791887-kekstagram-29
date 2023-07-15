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
export {getRandomInteger, getRandomArrayElement, createIdGenerator, isEscapeKey, getTemplate, renderPack};

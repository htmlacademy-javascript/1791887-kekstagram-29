/**
 * Функция для проверки строки.
 * @param {string} stringValue строка, которую нужно проверить
 * @param {number} maxLength  максимальная длина
 * @returns {boolean} 'true', если строка меньше или равна указанной длине, и 'false', если строка длиннее.
 */
const checkString = ({length}, maxLength) => length <= maxLength;

/**
 * Переворачивает строку
 * @param {string} string
 */
const reverseString = (string) => [...string].reverse().join('');

/**
 * Функция для проверки, является ли строка палиндромом.
 * @param {string} string
 * @returns
 */

const isPalindrome = (string) => {
  const normalizedString = string
    .toLowerCase()
    .replaceAll(' ', '');
  return normalizedString === reverseString(normalizedString);
};

/**
 * Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
 * @param {string | number} input
 * @returns {number} возвращает в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть 'NaN'
 */
const extractNumber = (input) => {
  const stringWithOnlyDigits = String(input).replace(/\D/g, '');

  return parseInt(stringWithOnlyDigits,10);
};

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

export {checkString, isPalindrome, extractNumber, createIdGenerator, getRandomArrayElement, getRandomInteger};

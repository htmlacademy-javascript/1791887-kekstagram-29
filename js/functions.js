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

console.log(isPalindrome('Леша'));

/**
 * Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
 * @param {string | number} input
 * @returns {number} возвращает в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть 'NaN'
 */
const extractNumber = (input) => {
	const stringWithOnlyDigits = String(input).replace(/\D/g, '');

	return parseInt(stringWithOnlyDigits,10);
};

export {checkString, isPalindrome, extractNumber};

/**
 * This module exports various regular expressions used for validation purposes.
 * @exports alphabetRegex
 * @exports alphanumRegex
 * @exports passwordRegex
 * @exports jwtRegex
 * @exports phoneNumberRegex
 * @exports latitudeRegex
 * @exports longitudeRegex
 */

/**
 * Regular expression for matching alphabetic characters and spaces.
 * @type {RegExp}
 * @description Allows alphabetic characters (both upper and lower case) and spaces.
 */
module.exports.alphabetRegex = /^[a-zA-Z\s]+$/;

/**
 * Regular expression for matching alphanumeric characters and spaces.
 * @type {RegExp}
 * @description Allows alphanumeric characters (both upper and lower case) and spaces.
 */
module.exports.alphanumRegex = /^[a-zA-Z0-9\s]+$/;

/**
 * Regular expression for matching valid password characters.
 * @type {RegExp}
 * @description Allows alphanumeric characters, periods, underscores, and selected special characters.
 */
module.exports.passwordRegex = /^[a-zA-Z0-9._!@#$%^&*]+$/;

/**
 * Regular expression for matching JWT (JSON Web Token) format.
 * @type {RegExp}
 * @description Allows alphanumeric characters, hyphens, and underscores, separated by periods in a JWT format.
 */
module.exports.jwtRegex = /^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/;

/**
 * Regular expression for matching phone numbers.
 * @type {RegExp}
 * @description Allows phone numbers in various formats including with or without country code, with or without parentheses, and with or without hyphens or spaces.
 */
module.exports.phoneNumberRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

/**
 * Regular expression for matching latitude coordinates.
 * @type {RegExp}
 * @description Allows latitude coordinates in decimal degrees format.
 */
module.exports.latitudeRegex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;

/**
 * Regular expression for matching longitude coordinates.
 * @type {RegExp}
 * @description Allows longitude coordinates in decimal degrees format.
 */
module.exports.longitudeRegex = /^[-+]?((180(\.0+)?)|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

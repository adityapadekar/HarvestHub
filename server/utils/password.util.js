/**
 * Utility functions module for password hashing and checking.
 * @exports hashPassword()
 * @exports checkPassword()
 */

// bcryptjs package to hash the password
const bcryptjs = require("bcryptjs");

/**
 * Hashes the password string.
 * @param {string} password - Password that is to be hashed
 * @returns {Promise<string>} Hashed password
 */
module.exports.hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
};

/**
 * Checks if the password matches the hashed password or not.
 * @param {string} password - Password that is tested against the hashed password
 * @param {string} hashedPassword - Password hash against which the password is to be tested
 * @returns {Promise<boolean>} True if the password is correct, else false
 */
module.exports.checkPassword = async (password, hashedPassword) => {
  const isMatch = await bcryptjs.compare(password, hashedPassword);
  return isMatch;
};

/**
 * CustomAPIError class, which extends the Error class.
 * @exports CustomAPIError
 */

/**
 * Represents a custom API error.
 * @class
 * @extends Error
 */
class CustomAPIError extends Error {
  /**
   * Creates an instance of CustomAPIError.
   * @param {string} message - The error message.
   */
  constructor(message) {
    // Call the constructor of the parent class (Error)
    super(message);
  }
}

module.exports = CustomAPIError;

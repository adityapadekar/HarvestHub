/**
 * UnauthorizedError class, which represents a HTTP 401 Unauthorized error.
 * @exports UnauthorizedError
 */

// Status codes package
const { StatusCodes } = require("http-status-codes");

// Custom error classes
const CustomAPIError = require("./CustomAPIError");

/**
 * Represents an UnauthorizedError with HTTP status code 401.
 * @class
 * @extends CustomAPIError
 * @description This error is thrown when the user is not authorized to access a resource.
 */
class UnauthorizedError extends CustomAPIError {
  /**
   * Creates an instance of UnauthorizedError.
   * @param {string} message - The error message.
   */
  constructor(message) {
    // Call the constructor of the parent class (CustomAPIError)
    super(message);
    /**
     * The HTTP status code for an unauthorized error.
     * @type {number}
     */
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;

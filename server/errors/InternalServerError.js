/**
 * InternalServerError class, which represents a HTTP 500 Internal Server Error.
 * @exports InternalServerError
 */

// Status codes package
const { StatusCodes } = require("http-status-codes");

// Custom error classes
const CustomAPIError = require("./CustomAPIError");

/**
 * Represents a InternalServerError with HTTP status code 500.
 * @class
 * @extends CustomAPIError
 * @description This error is thrown when an unexpected error occurs on the server side.
 */
class InternalServerError extends CustomAPIError {
  /**
   * Creates an instance of InternalServerError.
   * @param {string} message - The error message.
   */
  constructor(message) {
    // Call the constructor of the parent class (CustomAPIError)
    super(message);
    /**
     * The HTTP status code for an internal server error.
     * @type {number}
     */
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

module.exports = InternalServerError;

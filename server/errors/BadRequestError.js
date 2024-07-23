/**
 * BadRequestError class, which represents a HTTP 400 Bad Request error.
 * @exports BadRequestError
 */

// Status codes package
const { StatusCodes } = require("http-status-codes");

// Custom error classes
const CustomAPIError = require("./CustomAPIError");

/**
 * Represents a BadRequestError with HTTP status code 404.
 * @class
 * @extends CustomAPIError
 * @description This error is thrown when the a invalid request is made.
 */
class BadRequestError extends CustomAPIError {
  /**
   * Creates an instance of BadRequestError.
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message);
    /**
     * The HTTP status code for a bad request error.
     * @type {number}
     */
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;

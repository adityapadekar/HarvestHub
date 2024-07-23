/**
 * NotFoundError class, which represents a HTTP 404 Not Found error.
 * @exports NotFoundError
 */

// Status codes package
const { StatusCodes } = require("http-status-codes");

// Custom error classes
const CustomAPIError = require("./CustomAPIError");

/**
 * Represents a NotFoundError with HTTP status code 404.
 * @class
 * @extends CustomAPIError
 * @description This error is thrown when a requested resource is not found on the server.
 */
class NotFoundError extends CustomAPIError {
  /**
   * Creates an instance of NotFoundError.
   * @param {string} message - The error message.
   */
  constructor(message) {
    // Call the constructor of the parent class (CustomAPIError)
    super(message);
    /**
     * The HTTP status code for a not found error.
     * @type {number}
     */
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;

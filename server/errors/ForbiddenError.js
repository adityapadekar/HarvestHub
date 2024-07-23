/**
 * ForbiddenError class, which represents a HTTP 403 Forbidden error.
 * @exports ForbiddenError
 */

// Status codes package
const { StatusCodes } = require("http-status-codes");

// Custom error classes
const CustomAPIError = require("./CustomAPIError");

/**
 * Represents a ForbiddenError with HTTP status code 403.
 * @class
 * @extends CustomAPIError
 * @description This error is thrown when the user does not have permission to access a resource.
 */
class ForbiddenError extends CustomAPIError {
  /**
   * Creates an instance of ForbiddenError.
   * @param {string} message - The error message.
   */
  constructor(message) {
    // Call the constructor of the parent class (CustomAPIError)
    super(message);
    /**
     * The HTTP status code for a forbidden error.
     * @type {number}
     */
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = ForbiddenError;

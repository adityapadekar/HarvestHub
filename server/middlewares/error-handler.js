/**
 * Error handler middleware module.
 * @exports errorHandler
 */

// Package for status codes
const { StatusCodes } = require("http-status-codes");

/**
 * Middleware to ensure errors are handled properly.
 * @param {Error} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with error details
 */
// eslint-disable-next-line no-unused-vars
module.exports.errorHandler = async (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong! Please try again.",
  };
  return res.status(customError.statusCode).json({ message: customError.message, success: false });
};

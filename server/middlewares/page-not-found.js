/**
 * Middleware module to handle requests made to invalid API endpoints.
 * @exports pageNotFound
 */

// Package for status codes
const { StatusCodes } = require("http-status-codes");

/**
 * Middleware to handle API calls made at invalid endpoints.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response indicating the route does not exist
 */
// eslint-disable-next-line no-unused-vars
module.exports.pageNotFound = async (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({
    message: "Route does not exist!",
    success: false,
  });
};

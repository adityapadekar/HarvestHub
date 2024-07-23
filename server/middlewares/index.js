/**
 * @exports Middlewares as a module
 */
const { errorHandler } = require("./error-handler");
const { pageNotFound } = require("./page-not-found");
const { authorize, protect } = require("./auth");
const inputValidator = require("./input-validator");

module.exports = {
  errorHandler,
  pageNotFound,
  authorize,
  protect,
  inputValidator,
};

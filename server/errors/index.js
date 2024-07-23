/**
 * @exports Error classes as a module
 */
const CustomAPIError = require("./CustomAPIError");
const BadRequestError = require("./BadRequestError");
const NotFoundError = require("./NotFoundError");
const UnauthorizedError = require("./UnauthorizedError");
const InternalServerError = require("./InternalServerError");
const ForbiddenError = require("./ForbiddenError");

module.exports = {
  CustomAPIError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  InternalServerError,
  ForbiddenError,
};

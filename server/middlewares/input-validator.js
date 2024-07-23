/**
 * Validation middleware module.
 * @exports requestBody
 * @exports requestParams
 * @exports requestQuery
 */

// Validation utility function
const { validate } = require("../utils/validator.util");

/**
 * Middleware to validate request body against the specified schema.
 * @param {object} schema - Schema to validate against
 * @returns {Function} Function that executes validation process
 */
exports.requestBody = (schema) => {
  return async (req, res, next) => {
    await validate(schema, req.body);
    next();
  };
};

/**
 * Middleware to validate request parameters against the specified schema.
 * @param {object} schema - Schema to validate against
 * @returns {Function} Function that executes validation process
 */
exports.requestParams = (schema) => {
  return async (req, res, next) => {
    await validate(schema, req.params);
    next();
  };
};

/**
 * Middleware to validate request query against the specified schema.
 * @param {object} schema - Schema to validate against
 * @returns {Function} Function that executes validation process
 */
exports.requestQuery = (schema) => {
  return async (req, res, next) => {
    await validate(schema, req.query);
    next();
  };
};

/**
 * Utility functions module for input validation using Joi.
 * @exports validate()
 */

// Custom error classes
const { BadRequestError } = require("../errors");

// Options to be passed for validation process
const options = { abortEarly: false };

/**
 * Validates the input (request body, parameters, or queries) passed to the server using API calls.
 * @param {object} schema - Joi Schema against which the input object is to be validated
 * @param {object} obj - Input object
 * @throws {BadRequestError} (400) If the input validation check fails
 */
exports.validate = async (schema, obj) => {
  try {
    await schema.validateAsync(obj, options);
  } catch (error) {
    throw new BadRequestError("Invalid input!");
  }
};

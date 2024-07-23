/**
 * Validation schemas for general data using Joi.
 * @module generalValidator
 */

// Joi package to define input schema
const joi = require("joi");

// Allowed regular expressions
const allowedRegex = require("../constants/regex.constant");

// Allowed values
const allowedValues = require("../constants/allowed-values.constant");

// Schema for JSON web token
module.exports.jwtTokenSchema = joi.object({
  token: joi.string().regex(allowedRegex.jwtRegex).trim().required(),
});

// Schema for email
module.exports.emailSchema = joi.object({
  email: joi.string().email().trim().required(),
});

// Schema for id
module.exports.idSchema = joi.object({
  id: joi.number().required(),
});

// Schema for location search
module.exports.locationSchema = joi.object({
  latitude: joi.number(),
  longitude: joi.number(),
});

// Schema for items and location combined search
module.exports.itemsAndlocationSchema = joi.object({
  latitude: joi.number(),
  longitude: joi.number(),
  productType: joi
    .string()
    .trim()
    .valid(...allowedValues.productTypes)
    .required(),
});

// Schema for toggle favourite items event
module.exports.toggleFavouriteEventSchema = joi.object({
  event: joi.string().trim().valid("like", "unlike").required(),
});

// Schema for searching query
module.exports.filterQuerySchema = joi.object({
  search: joi.string().regex(allowedRegex.alphanumRegex).trim(),
  page: joi.number(),
});

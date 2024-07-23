/**
 * Validation schemas for moderator-related data using Joi.
 * @module moderatorValidator
 */

// Joi package to define input schema
const joi = require("joi");

// Allowed values
const allowedValues = require("../constants/allowed-values.constant");

// Schema for creating a item
module.exports.createItemSchema = joi.object({
  productId: joi.number().required(),
  productSize: joi
    .string()
    .valid(...allowedValues.productSizes)
    .trim()
    .required(),
  marketId: joi.number().required(),
  minPrice: joi.number().required(),
  maxPrice: joi.number().required(),
});

// Schema for updating a item
module.exports.updateItemSchema = joi.object({
  productId: joi.number().required(),
  productSize: joi
    .string()
    .valid(...allowedValues.productSizes)
    .trim()
    .required(),
  minPrice: joi.number().required(),
  maxPrice: joi.number().required(),
  image_url: joi.string().trim(),
  image_public_id: joi.string().trim(),
});

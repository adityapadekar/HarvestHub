/**
 * Validation schemas for admin-related data using Joi.
 * @module adminValidator
 */

// Joi package to define input schema
const joi = require("joi");

// Allowed values
const allowedValues = require("../constants/allowed-values.constant");

// Allowed regular expressions
const allowedRegex = require("../constants/regex.constant");

// Schema for creating a market
module.exports.createMarketSchema = joi.object({
  marketName: joi.string().regex(allowedRegex.alphanumRegex).trim().required(),
  address: joi.string().trim().required(),
  contactNumber: joi.string().regex(allowedRegex.phoneNumberRegex).trim().required(),
  latitude: joi.string().regex(allowedRegex.latitudeRegex).trim().required(),
  longitude: joi.string().regex(allowedRegex.longitudeRegex).trim().required(),
});

// Schema for updating a market
module.exports.updateMarketSchema = joi.object({
  marketName: joi.string().regex(allowedRegex.alphanumRegex).trim().required(),
  address: joi.string().required(),
  contactNumber: joi.string().regex(allowedRegex.phoneNumberRegex).trim().required(),
  latitude: joi.string().regex(allowedRegex.latitudeRegex).trim().required(),
  longitude: joi.string().regex(allowedRegex.longitudeRegex).trim().required(),
  image_url: joi.string().trim(),
  image_public_id: joi.string().trim(),
});

// Schema for creating a product
module.exports.createProductSchema = joi.object({
  productName: joi.string().regex(allowedRegex.alphanumRegex).trim().required(),
  productType: joi
    .string()
    .valid(...allowedValues.productTypes)
    .trim()
    .required(),
  unit: joi
    .string()
    .valid(...allowedValues.productUnits)
    .trim()
    .required(),
});

// Schema for updating a product
module.exports.updateProductSchema = joi.object({
  productName: joi.string().regex(allowedRegex.alphanumRegex).trim().required(),
  productType: joi
    .string()
    .valid(...allowedValues.productTypes)
    .trim()
    .required(),
  unit: joi
    .string()
    .valid(...allowedValues.productUnits)
    .trim()
    .required(),
  image_url: joi.string().trim(),
  image_public_id: joi.string().trim(),
});

// Schema for updating market-moderator mappings
module.exports.updateMarketModeratorMappingSchema = joi.object({
  moderatorId: joi.number().required(),
  marketId: joi.number().required(),
  operation: joi
    .string()
    .valid(...allowedValues.marketModeratorMappingOperations)
    .trim()
    .required(),
});

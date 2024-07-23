/**
 * Validation schemas for authentication-related data using Joi.
 * @module authValidator
 */

// Joi package to define input schema
const joi = require("joi");

// Allowed regular expressions
const allowedRegex = require("../constants/regex.constant");

// Schema for user signup data validation
module.exports.signupSchema = joi.object({
  name: joi.string().regex(allowedRegex.alphabetRegex).trim().required(),
  username: joi.string().alphanum().trim().required(),
  email: joi.string().email().trim().required(),
  password: joi.string().regex(allowedRegex.passwordRegex).trim().required(),
});

// Schema for user login data validation
module.exports.loginSchema = joi.object({
  username: joi.string().alphanum().trim().required(),
  password: joi.string().regex(allowedRegex.passwordRegex).trim().required(),
});

// Schema for email verification data validation
module.exports.emailVerificationSchema = joi
  .object({
    userId: joi.number().required(),
    email: joi.string().email().trim().required(),
    hash: joi.string().alphanum().trim().required(),
  })
  .unknown(true);

// Schema for updating user profile data validation
module.exports.updateUserProfileSchema = joi.object({
  name: joi.string().regex(allowedRegex.alphabetRegex).trim().required(),
  contactNumber: joi.string().regex(allowedRegex.phoneNumberRegex).trim().required(),
  address: joi.string().trim().required(),
});

// Schema for change password data validation
module.exports.changePasswordSchema = joi.object({
  oldPassword: joi.string().regex(allowedRegex.passwordRegex).trim().required(),
  newPassword: joi.string().regex(allowedRegex.passwordRegex).trim().required(),
});

// Schema for password data validation
module.exports.passwordSchema = joi.object({
  password: joi.string().regex(allowedRegex.passwordRegex).trim().required(),
});

// Schema for forgot password token data validation
module.exports.forgotPasswordTokenSchema = joi
  .object({
    userId: joi.number().required(),
    hash: joi.string().alphanum().trim().required(),
  })
  .unknown(true);

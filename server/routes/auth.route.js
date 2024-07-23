/**
 * Express router for authentication-related routes.
 * @module authRouter
 */

// Express package to instantiate router
const express = require("express");

// Middlewares
const { protect, inputValidator } = require("../middlewares");

// AuthController module
const authController = require("../controllers/auth.controller");

// Input validator functions
const authValidator = require("../validators/auth.validator");
const generalValidator = require("../validators/general.validators");

// Create a new instance of Express router
const authRouter = new express.Router();

// Route for user signup
authRouter.route("/signup").post(inputValidator.requestBody(authValidator.signupSchema), authController.signUp);

// Route for user login
authRouter.route("/login").post(inputValidator.requestBody(authValidator.loginSchema), authController.login);

// Route for fetching user details
authRouter.route("/user").get(protect, authController.fetchUserDetails);

// Route for updating user profile
authRouter
  .route("/user")
  .patch(protect, inputValidator.requestBody(authValidator.updateUserProfileSchema), authController.updateProfile);

// Route for changing password
authRouter
  .route("/change-password")
  .patch(protect, inputValidator.requestBody(authValidator.changePasswordSchema), authController.changePassword);

// Route for email verification
authRouter
  .route("/verify-email")
  .post(inputValidator.requestQuery(generalValidator.jwtTokenSchema), authController.verifyEmail);

// Route for generating a forgot password link
authRouter
  .route("/forgot-password")
  .post(inputValidator.requestBody(generalValidator.emailSchema), authController.generateForgotPasswordLink);

// Route for resetting password
authRouter
  .route("/reset-password")
  .post(
    inputValidator.requestQuery(generalValidator.jwtTokenSchema),
    inputValidator.requestBody(authValidator.passwordSchema),
    authController.resetPassword,
  );

// Export the authRouter
module.exports = authRouter;

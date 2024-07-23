/**
 * Express router for authentication-related routes.
 * @module authRouter
 */

// Express package to instantiate router
const express = require("express");

// Multer package to upload images and buffers
const multer = require("multer");

// Middlewares
const { protect, authorize, inputValidator } = require("../middlewares");

// adminController module
const adminController = require("../controllers/admin.controller");

// Input validator functions
const authValidator = require("../validators/auth.validator");
const adminValidator = require("../validators/admin.validator");
const generalValidator = require("../validators/general.validators");

// Create a new instance of Express router
const adminRouter = new express.Router();

// Create a new instance of upload object
const upload = multer({ storage: multer.memoryStorage() });

// Route for creating a new admin user
adminRouter
  .route("/")
  .post(
    protect,
    authorize("admin"),
    inputValidator.requestBody(authValidator.signupSchema),
    adminController.createAdmin,
  );

// Route for creating a new moderator user
adminRouter
  .route("/moderator")
  .post(
    protect,
    authorize("admin"),
    inputValidator.requestBody(authValidator.signupSchema),
    adminController.createModerator,
  );

// Route for getting all moderators
adminRouter
  .route("/moderators")
  .get(
    protect,
    authorize("admin"),
    inputValidator.requestQuery(generalValidator.filterQuerySchema),
    adminController.getModerators,
  );

// Route for deleting a user by ID
adminRouter
  .route("/user/:id")
  .delete(
    protect,
    authorize("admin"),
    inputValidator.requestParams(generalValidator.idSchema),
    adminController.deleteUser,
  );

// Route for creating a new market
adminRouter
  .route("/market")
  .post(
    protect,
    authorize("admin"),
    upload.single("image"),
    inputValidator.requestBody(adminValidator.createMarketSchema),
    adminController.createMarket,
  );

// Route for updating an existing market
adminRouter
  .route("/market/:id")
  .put(
    protect,
    authorize("admin"),
    upload.single("image"),
    inputValidator.requestBody(adminValidator.updateMarketSchema),
    inputValidator.requestParams(generalValidator.idSchema),
    adminController.updateMarket,
  );

// Route for deleting an existing market
adminRouter
  .route("/market/:id")
  .delete(
    protect,
    authorize("admin"),
    inputValidator.requestParams(generalValidator.idSchema),
    adminController.deleteMarket,
  );

// Route for updating market-moderator mappings
adminRouter
  .route("/moderator-market-mapping")
  .patch(
    protect,
    authorize("admin"),
    inputValidator.requestBody(adminValidator.updateMarketModeratorMappingSchema),
    adminController.updateMarketModeratorMapping,
  );

// Route for creating a new product
adminRouter
  .route("/product")
  .post(
    protect,
    authorize("admin"),
    upload.single("image"),
    inputValidator.requestBody(adminValidator.createProductSchema),
    adminController.createProduct,
  );

// Route for updating an existing product
adminRouter
  .route("/product/:id")
  .put(
    protect,
    authorize("admin"),
    upload.single("image"),
    inputValidator.requestBody(adminValidator.updateProductSchema),
    inputValidator.requestParams(generalValidator.idSchema),
    adminController.updateProduct,
  );

// Route for deleting an existing product
adminRouter
  .route("/product/:id")
  .delete(
    protect,
    authorize("admin"),
    inputValidator.requestParams(generalValidator.idSchema),
    adminController.deleteProduct,
  );

// Export the adminRouter
module.exports = adminRouter;

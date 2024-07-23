/**
 * Express router for authentication-related routes.
 * @module moderatorRouter
 */

// Express package to instantiate router
const express = require("express");

// Multer package to upload images and buffers
const multer = require("multer");

// Middlewares
const { protect, authorize, inputValidator } = require("../middlewares");

// ModeratorController module
const moderatorController = require("../controllers/moderator.controller");

// Input validator functions
const moderatorValidator = require("../validators/moderator.validator");
const generalValidator = require("../validators/general.validators");

// Create a new instance of Express router
const moderatorRouter = new express.Router();

// Create a new instance of upload object
const upload = multer({ storage: multer.memoryStorage() });

// Route for creating a new item
moderatorRouter
  .route("/item")
  .post(
    protect,
    authorize("moderator"),
    upload.single("image"),
    inputValidator.requestBody(moderatorValidator.createItemSchema),
    moderatorController.addItem,
  );

// Route for updating a item
moderatorRouter
  .route("/item/:id")
  .put(
    protect,
    authorize("moderator"),
    upload.single("image"),
    inputValidator.requestParams(generalValidator.idSchema),
    inputValidator.requestBody(moderatorValidator.updateItemSchema),
    moderatorController.updateItem,
  );

// Route for deleting a item
moderatorRouter
  .route("/item/:id")
  .delete(
    protect,
    authorize("moderator"),
    inputValidator.requestParams(generalValidator.idSchema),
    moderatorController.deleteItem,
  );

module.exports = moderatorRouter;

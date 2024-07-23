/**
 * Express router for item-related routes.
 * @module itemRouter
 */

// Express package to instantiate router
const express = require("express");

// Middlewares
const { protect, authorize, inputValidator } = require("../middlewares");

// ItemController module
const itemController = require("../controllers/item.controller");

// Input validator functions
const generalValidator = require("../validators/general.validators");

// Create a new instance of Express router
const itemRouter = new express.Router();

// Route for fetching item details
itemRouter
  .route("/:id")
  .get(
    protect,
    authorize("admin", "moderator", "user"),
    inputValidator.requestParams(generalValidator.idSchema),
    itemController.getItem,
  );

// Route for fetching items
itemRouter
  .route("/all")
  .post(
    protect,
    authorize("admin", "moderator", "user"),
    inputValidator.requestBody(generalValidator.itemsAndlocationSchema),
    inputValidator.requestQuery(generalValidator.filterQuerySchema),
    itemController.getItems,
  );

// Route for unlike and like market
itemRouter
  .route("/favourite/:id")
  .post(
    protect,
    authorize("admin", "moderator", "user"),
    inputValidator.requestParams(generalValidator.idSchema),
    inputValidator.requestBody(generalValidator.toggleFavouriteEventSchema),
    itemController.toggleFavouriteItem,
  );

// Route for fetching favourite markets
itemRouter
  .route("/favourite/all")
  .get(
    protect,
    authorize("admin", "moderator", "user"),
    inputValidator.requestQuery(generalValidator.filterQuerySchema),
    itemController.getFavouriteItems,
  );

// Route for recommended items
itemRouter
  .route("/recommended")
  .post(
    protect,
    authorize("admin", "moderator", "user"),
    inputValidator.requestBody(generalValidator.itemsAndlocationSchema),
    inputValidator.requestQuery(generalValidator.filterQuerySchema),
    itemController.getItems,
  );

module.exports = itemRouter;

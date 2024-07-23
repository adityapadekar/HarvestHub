/**
 * Express router for market-related routes.
 * @module marketRouter
 */

// Express package to instantiate router
const express = require("express");

// Middlewares
const { protect, authorize, inputValidator } = require("../middlewares");

// MarketController module;
const marketController = require("../controllers/market.controller");

// Input validator functions
const generalValidator = require("../validators/general.validators");

// Create a new instance of Express router
const marketRouter = new express.Router();

// Route for fetching market details
marketRouter
  .route("/:id")
  .get(
    protect,
    authorize("admin", "moderator", "user"),
    inputValidator.requestParams(generalValidator.idSchema),
    marketController.getMarket,
  );

// Route for fetching all markets
marketRouter
  .route("/all")
  .post(
    protect,
    authorize("admin", "moderator", "user"),
    inputValidator.requestBody(generalValidator.locationSchema),
    inputValidator.requestQuery(generalValidator.filterQuerySchema),
    marketController.getMarkets,
  );

// Route for unlike and like market
marketRouter
  .route("/favourite/:id")
  .post(
    protect,
    authorize("admin", "moderator", "user"),
    inputValidator.requestParams(generalValidator.idSchema),
    inputValidator.requestBody(generalValidator.toggleFavouriteEventSchema),
    marketController.toggleFavouriteMarket,
  );

// Route for fetching favourite markets
marketRouter
  .route("/favourite/all")
  .get(
    protect,
    authorize("admin", "moderator", "user"),
    inputValidator.requestQuery(generalValidator.filterQuerySchema),
    marketController.getFavouriteMarkets,
  );

module.exports = marketRouter;

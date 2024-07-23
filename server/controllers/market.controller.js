/**
 * Controller functions for market related operations
 * @module marketController
 * @exports getMarket
 * @exports getMarkets
 * @exports toggleFavouriteMarket
 * @exports getFavouriteMarkets
 */

// Status codes package
const { StatusCodes } = require("http-status-codes");

// Connection pool used to connect to POSTGRESQL DATABASE
const { pool } = require("../db");

// Custom error classes
const { NotFoundError, InternalServerError, CustomAPIError } = require("../errors");

/**
 * Controller function to get information about a market including its products.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {NotFoundError} If the market with the given ID is not found
 * @throws {InternalServerError} If unable to retrieve market information
 * @throws {CustomAPIError} If a custom API error occurs during the process
 */
module.exports.getMarket = async (req, res) => {
  const { id: marketId } = req.params;

  try {
    // Query the database to get information about the market
    const market = await pool.query(
      "SELECT *, ST_X(geo_location::geometry) AS latitude, ST_Y(geo_location::geometry) AS longitude FROM markets AS m  WHERE id = $1",
      [marketId],
    );

    // Check if the market exists
    if (!market.rowCount) {
      throw new NotFoundError("Market not found!");
    }

    // Query the database to get information about the items in the market
    const items = await pool.query(
      "SELECT p.product_name, p.product_type, i.product_id, i.product_size, p.unit, i.market_id, i.image_url, i.image_public_id, i.min_price, i.max_price, i.created_by, i.updated_by, i.created_at, i.updated_at FROM items AS i JOIN products AS p ON i.product_id = p.id WHERE market_id = $1",
      [market.rows[0].id],
    );

    // Send success response with market and items data
    res.status(StatusCodes.OK).json({
      message: "Market found!",
      success: true,
      result: { market: market.rows, items: items.rows },
    });
  } catch (error) {
    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to fetch market! Please try again.");
  }
};

/**
 * Controller function to retrieve a list of markets based on search criteria and location.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {InternalServerError} If unable to retrieve markets
 * @throws {CustomAPIError} If a custom API error occurs during the process
 */
module.exports.getMarkets = async (req, res) => {
  const { search, page } = req.query;
  const { latitude, longitude } = req.body;

  try {
    let query =
      "SELECT *, ST_X(geo_location::geometry) AS latitude, ST_Y(geo_location::geometry) AS longitude FROM markets";
    const queryParam = [];

    // Construct the query based on search criteria
    if (search && search !== "") {
      query += " WHERE market_name ILIKE $1 OR address ILIKE $1";
      queryParam.push(`%${search}%`);
    }

    // Add location-based ordering if latitude and longitude are provided
    if (latitude && longitude) {
      query += ` ORDER BY geo_location <-> ST_POINT($${queryParam.length + 1}, $${queryParam.length + 2})::geography`;
      queryParam.push(longitude);
      queryParam.push(latitude);
    } else {
      query += " ORDER BY market_name";
    }

    // Add pagination
    const pageLimit = 15;
    const pageNumber = page ? page : 1;
    const offset = (pageNumber - 1) * pageLimit;

    query += ` OFFSET $${queryParam.length + 1} LIMIT $${queryParam.length + 2}`;
    queryParam.push(offset);
    queryParam.push(pageLimit);

    // Execute the query to retrieve markets
    const markets = await pool.query(query, queryParam);

    // Send success response with the list of markets
    res.status(StatusCodes.OK).json({
      message: "Markets found!",
      success: true,
      result: markets.rows,
    });
  } catch (error) {
    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to fetch markets! Please try again.");
  }
};

/**
 * Controller function to toggle favourite status of a market for a user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {NotFoundError} If the market does not exist
 * @throws {InternalServerError} If there is a server error while processing the request
 * @throws {CustomAPIError} If a custom API error occurs during the process
 */
module.exports.toggleFavouriteMarket = async (req, res) => {
  const { id: marketId } = req.params;
  const { event } = req.body;
  const user = req.user;

  try {
    // Query the database to get information about the market
    const market = await pool.query("SELECT * FROM markets AS m  WHERE id = $1", [marketId]);

    // Check if the market exists
    if (!market.rowCount) {
      throw new NotFoundError("Market not found!");
    }

    if (event === "like") {
      await pool.query("INSERT INTO favourite_markets(user_id, market_id) VALUES ($1, $2)", [
        user.id,
        market.rows[0].id,
      ]);
    } else if (event === "unlike") {
      await pool.query("DELETE FROM favourite_markets WHERE user_id = $1 AND market_id = $2", [
        user.id,
        market.rows[0].id,
      ]);
    }

    res.status(StatusCodes.OK).json({
      message: `Favourite market ${event}d successfully!`,
      success: true,
    });
  } catch (error) {
    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to toggle favourite market! Please try again.");
  }
};

/**
 * Controller function to retrieve details of a favourite markets.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {NotFoundError} If the requested favourite market is not found
 * @throws {InternalServerError} If there is a server error while processing the request
 * @throws {CustomAPIError} If a custom API error occurs during the process
 */
module.exports.getFavouriteMarkets = async (req, res) => {
  const { search, page } = req.query;
  const user = req.user;

  try {
    // Fetch details of the favourite market from the database
    let query =
      "SELECT *, ST_X(geo_location::geometry) AS latitude, ST_Y(geo_location::geometry) AS longitude FROM markets AS m JOIN favourite_markets AS fm ON m.id = fm.market_id WHERE fm.user_id = $1";
    const queryParam = [user.id];

    // Construct the query based on search criteria
    if (search && search !== "") {
      query += " market_name ILIKE $2 OR address ILIKE $2";
      queryParam.push(`%${search}%`);
    }

    // Add pagination
    const pageLimit = 15;
    const pageNumber = page ? page : 1;
    const offset = (pageNumber - 1) * pageLimit;

    query += ` OFFSET $${queryParam.length + 1} LIMIT $${queryParam.length + 2}`;
    queryParam.push(offset);
    queryParam.push(pageLimit);

    // Execute the query to retrieve markets
    const markets = await pool.query(query, queryParam);

    // Send response with market details and associated products
    res.status(StatusCodes.OK).json({
      message: "Favourite market found!",
      success: true,
      result: markets.rows,
    });
  } catch (error) {
    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to fetch favourite market! Please try again.");
  }
};

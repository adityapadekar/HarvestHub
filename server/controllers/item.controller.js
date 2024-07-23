/**
 * Controller functions for item related operations
 * @module itemController
 * @exports getItem
 * @exports getItems
 * @exports toggleFavouriteItem
 * @exports getFavouriteItems
 */

// Status codes package
const { StatusCodes } = require("http-status-codes");

// Connection pool used to connect to POSTGRESQL DATABASE
const { pool } = require("../db");

// Custom error classes
const { NotFoundError, InternalServerError, CustomAPIError } = require("../errors");

/**
 * Get an item by its ID.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} JSON response indicating success or failure.
 * @throws {InternalServerError} If an unexpected error occurs.
 */
module.exports.getItem = async (req, res) => {
  const { id: itemId } = req.params;

  try {
    // Retrieve the item from the database
    const item = await pool.query(
      "SELECT i.id, p.product_name, p.product_type, p.unit, i.product_size, i.image_url, i.image_public_id, i.min_price, i.max_price, i.created_by, i.updated_by, i.created_at, i.updated_at, i.product_id, m.market_name, m.address AS market_address, m.contact_number AS market_contact_number, ST_X(m.geo_location::geometry) AS market_latitude, ST_Y(m.geo_location::geometry) AS market_longitude, m.image_url AS market_image_url, m.image_public_id AS market_image_public_id FROM products AS p JOIN items AS i ON p.id = i.product_id JOIN markets AS m ON m.id = i.market_id WHERE i.id = $1",
      [itemId],
    );

    // Return successful response with the item
    res.status(StatusCodes.OK).json({
      message: "Item found!",
      success: true,
      result: { item: item.rows[0] },
    });
  } catch (error) {
    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }
    // If it's an unexpected error, throw InternalServerError
    throw new InternalServerError("Unable to get item! Please try again.");
  }
};

/**
 * Controller function to retrieve items based on provided filters.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {InternalServerError} If there is a server error while processing the request
 * @throws {CustomAPIError} If a custom API error occurs during the process
 */
module.exports.getItems = async (req, res) => {
  const { latitude, longitude, productType } = req.body;
  const { search, page } = req.query;

  try {
    // Construct the base query for fetching items
    let query =
      "SELECT i.id, p.product_name, p.product_type, p.unit, i.product_size, i.image_url, i.image_public_id, i.min_price, i.max_price, i.product_id, m.market_name, m.address AS market_address FROM products AS p JOIN items AS i ON p.id = i.product_id JOIN markets AS m ON m.id = i.market_id WHERE p.product_type = $1";

    // Define the query parameters array and add the productType as the first parameter
    const queryParam = [productType];

    // If search parameter is provided, add conditions to filter based on product name, size, and market name
    if (search && search !== "") {
      query += " p.product_name ILIKE $2 OR p.product_size ILIKE $2 OR m.market_name ILIKE $2";

      // Add the search parameter to the query parameters array
      queryParam.push(`%${search}%`);
    }

    // If latitude and longitude are provided, add sorting based on proximity to provided coordinates
    if (latitude && longitude) {
      query += ` ORDER BY m.geo_location <-> ST_POINT($${queryParam.length + 1}, $${queryParam.length + 2})::geography`;

      // Add latitude and longitude parameters to the query parameters array
      queryParam.push(longitude);
      queryParam.push(latitude);
    } else {
      // Otherwise, default sorting based on product name
      query += " ORDER BY p.product_name";
    }

    // Add pagination using OFFSET and LIMIT
    const pageLimit = 15;
    const pageNumber = page ? page : 1;
    const offset = (pageNumber - 1) * pageLimit;

    query += ` OFFSET $${queryParam.length + 1} LIMIT $${queryParam.length + 2}`;

    // Add offset and limit parameters to the query parameters array
    queryParam.push(offset);
    queryParam.push(pageLimit);

    // Execute the query to fetch items
    const items = await pool.query(query, queryParam);

    // Send response with items found
    res.status(StatusCodes.OK).json({
      message: "Items found!",
      success: true,
      result: items.rows,
    });
  } catch (error) {
    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to get items! Please try again.");
  }
};

/**
 * Controller function to toggle favourite status of a item for a user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {NotFoundError} If the item does not exist
 * @throws {InternalServerError} If there is a server error while processing the request
 * @throws {CustomAPIError} If a custom API error occurs during the process
 */
module.exports.toggleFavouriteItem = async (req, res) => {
  const { id: itemId } = req.params;
  const { event } = req.body;
  const user = req.user;

  try {
    // Query the database to get information about the item
    const item = await pool.query("SELECT * FROM items AS m  WHERE id = $1", [itemId]);

    // Check if the item exists
    if (!item.rowCount) {
      throw new NotFoundError("Item not found!");
    }

    if (event === "like") {
      await pool.query("INSERT INTO favourite_items(user_id, product_id) VALUES ($1, $2)", [user.id, item.rows[0].id]);
    } else if (event === "unlike") {
      await pool.query("DELETE FROM favourite_items WHERE user_id = $1 AND product_id = $2", [user.id, item.rows[0].id]);
    }

    res.status(StatusCodes.OK).json({
      message: `Favourite item ${event}d successfully!`,
      success: true,
    });
  } catch (error) {
    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to toggle favourite item! Please try again.");
  }
};

/**
 * Controller function to retrieve details of a favourite items.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {NotFoundError} If the requested favourite market is not found
 * @throws {InternalServerError} If there is a server error while processing the request
 * @throws {CustomAPIError} If a custom API error occurs during the process
 */
module.exports.getFavouriteItems = async (req, res) => {
  const { search, page } = req.query;
  const user = req.user;

  try {
    // Fetch details of the favourite market from the database
    let query =
      "SELECT i.id, p.product_name, p.product_type, p.unit, i.product_size, i.image_url, i.image_public_id, i.min_price, i.max_price, i.product_id, m.market_name, m.address AS market_address FROM products AS p JOIN items AS i ON p.id = i.product_id JOIN markets AS m ON m.id = i.market_id JOIN favourite_items AS fm ON fm.product_id = i.id WHERE fm.user_id = $1";
    const queryParam = [user.id];

    // Construct the query based on search criteria
    if (search && search !== "") {
      query += " p.product_name ILIKE $2 OR p.product_type ILIKE $2 OR m.market_name ILIKE $2 OR m.address ILIKE $2";
      queryParam.push(`%${search}%`);
    }

    // Add pagination
    const pageLimit = 15;
    const pageNumber = page ? page : 1;
    const offset = (pageNumber - 1) * pageLimit;

    query += ` OFFSET $${queryParam.length + 1} LIMIT $${queryParam.length + 2}`;
    queryParam.push(offset);
    queryParam.push(pageLimit);

    // Execute the query to retrieve items
    const items = await pool.query(query, queryParam);

    // Send response with items details and associated products
    res.status(StatusCodes.OK).json({
      message: "Favourite items found!",
      success: true,
      result: items.rows,
    });
  } catch (error) {
    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to fetch favourite item! Please try again.");
  }
};

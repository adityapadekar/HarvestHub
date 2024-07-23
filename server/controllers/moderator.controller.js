/**
 * Controller functions for moderator related operations
 * @module moderatorController
 * @exports addItem
 * @exports updateItem
 * @exports deleteItem
 */

// Status codes package
const { StatusCodes } = require("http-status-codes");

// Connection pool used to connect to POSTGRESQL DATABASE
const { pool } = require("../db");

// Custom error classes
const { NotFoundError, BadRequestError, InternalServerError, UnauthorizedError, CustomAPIError } = require("../errors");

// Utility functions
const { uploadBufferDataToCloudinary, deleteFromCloudinary } = require("../utils/cloudinary.util");

// Allowed values for certain fields
const allowedValues = require("../constants/allowed-values.constant");

/**
 * Controller function to add an item to a market.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {BadRequestError} If the request body is missing required fields or contains invalid data
 * @throws {UnauthorizedError} If the user is not authorized to add an item to the specified market
 * @throws {NotFoundError} If the product does not exist
 * @throws {InternalServerError} If unable to add the item
 * @throws {CustomAPIError} If a custom API error occurs during the process
 */
module.exports.addItem = async (req, res) => {
  const { productId, productSize, marketId, minPrice, maxPrice } = req.body;
  const user = req.user;
  const buffer = req.file?.buffer;
  const mimetype = req.file?.mimetype;

  // Check if an image file is uploaded
  const fileIsUploaded = buffer && mimetype && allowedValues.imageTypes.includes(mimetype);

  if (!fileIsUploaded) {
    throw new BadRequestError("Please upload image");
  }

  let uploadedImage;
  try {
    // Check if the user is authorized to add an item to the market
    const isAuthorized = await pool.query(
      "SELECT 1 FROM moderator_market_mappings WHERE moderator_id = $1 AND market_id = $2;",
      [user.id, marketId],
    );

    if (isAuthorized.rowCount === 0) {
      throw new UnauthorizedError("Not authorized to add item!");
    }

    // Check if the product already exists
    const productExists = await pool.query(
      "SELECT product_name, product_type, image_url, image_public_id, unit FROM products WHERE id = $1",
      [productId],
    );

    if (productExists.rowCount === 0) {
      throw new NotFoundError("Product does not exist!");
    }

    // Check if the item already exists in the market
    const existingProduct = await pool.query(
      "SELECT 1 FROM items WHERE product_id = $1 AND LOWER(product_size) = LOWER($2) AND market_id = $3",
      [productId, productSize, marketId],
    );

    if (existingProduct.rowCount > 0) {
      throw new BadRequestError("Item already exists!");
    }

    let image;
    if (buffer && mimetype) {
      // Upload the image to Cloudinary
      image = await uploadBufferDataToCloudinary(buffer, "items");
      uploadedImage = image;
    } else {
      // Use the existing product image
      image = {
        secure_url: productExists.rows[0].image_url,
        public_id: productExists.rows[0].image_public_id,
      };
    }

    // Insert the new item into the database
    await pool.query(
      "INSERT INTO items(product_id, product_size, market_id, image_url, image_public_id, min_price, max_price, created_by, updated_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $8)",
      [
        productId,
        productSize,
        marketId,
        image.secure_url,
        image.public_id,
        minPrice,
        maxPrice,
        user.id,
      ],
    );

    // Send success response
    res.status(StatusCodes.CREATED).json({
      message: "Item added successfully!",
      success: true,
    });
  } catch (error) {
    // If an uploaded image exists, delete it from Cloudinary
    if (uploadedImage) {
      await deleteFromCloudinary(uploadedImage.public_id);
    }

    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to add item! Please try again.");
  }
};

/**
 * Controller function to update an item.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {BadRequestError} If the request body is missing required fields or contains invalid data
 * @throws {UnauthorizedError} If the user is not authorized to update the item
 * @throws {NotFoundError} If the item does not exist
 * @throws {InternalServerError} If unable to update the item
 * @throws {CustomAPIError} If a custom API error occurs during the process
 */
module.exports.updateItem = async (req, res) => {
  const { id: itemId } = req.params;
  const { productId, productSize, marketId, minPrice, maxPrice, image_url, image_public_id } = req.body;
  const user = req.user;
  const buffer = req.file?.buffer;
  const mimetype = req.file?.mimetype;

  // Check if an image file is provided
  const imageProvided = buffer && mimetype && allowedValues.imageTypes.includes(mimetype);
  const imageUrlProvided = image_url && image_public_id;
  const imageAvailable = imageProvided || imageUrlProvided;

  if (!imageAvailable) {
    throw new BadRequestError("Please provide image");
  }

  let uploadedImage;
  try {
    // Check if the user is authorized to update the item
    const isAuthorized = await pool.query(
      "SELECT 1 FROM moderator_market_mappings WHERE moderator_id = $1 AND market_id = $2;",
      [user.id, marketId],
    );

    if (isAuthorized.rowCount) {
      throw new UnauthorizedError("Not authorized to update item!");
    }

    // Check if the product exists
    const productExists = await pool.query(
      "SELECT product_name, product_type, image_url, image_public_id, unit FROM products WHERE id = $1",
      [productId],
    );

    if (!productExists.rowCount) {
      throw new BadRequestError("Product does not exist!");
    }

    // Check if the item exists
    const existingItem = await pool.query("SELECT * FROM items WHERE id = $1", [itemId]);

    if (!existingItem.rowCount) {
      throw new NotFoundError("Item does not exist!");
    }

    if (buffer && mimetype) {
      // Upload the new image to Cloudinary
      uploadedImage = await uploadBufferDataToCloudinary(buffer, "items");
    }

    // Update the item in the database
    await pool.query(
      "UPDATE items SET product_id = $1, product_size = $2, image_url = $3, image_public_id = $4, min_price = $5, max_price = $6, updated_by = $7, updated_at = NOW() WHERE id = $8",
      [
        productId,
        productSize,
        uploadedImage ? uploadedImage.secure_url : image_url,
        uploadedImage ? uploadedImage.public_id : image_public_id,
        minPrice,
        maxPrice,
        user.id,
        itemId,
      ],
    );

    // Send success response
    res.status(StatusCodes.OK).json({
      message: "Item updated successfully!",
      success: true,
    });
  } catch (error) {
    // If an uploaded image exists, delete it from Cloudinary
    if (uploadedImage) {
      await deleteFromCloudinary(uploadedImage.public_id);
    }

    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to update item! Please try again.");
  }
};

/**
 * Controller function to delete an item.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {NotFoundError} If the item does not exist
 * @throws {UnauthorizedError} If the user is not authorized to delete the item
 * @throws {InternalServerError} If unable to delete the item
 * @throws {CustomAPIError} If a custom API error occurs during the process
 */
module.exports.deleteItem = async (req, res) => {
  const { id: itemId } = req.params;
  const user = req.user;

  try {
    // Check if the item exists
    const existingItem = await pool.query("SELECT * FROM items WHERE id = $1", [itemId]);

    if (!existingItem.rowCount) {
      throw new NotFoundError("Item does not exist!");
    }

    // Check if the user is authorized to delete the item
    const isAuthorized = await pool.query(
      "SELECT 1 FROM moderator_market_mappings WHERE moderator_id = $1 AND market_id = $2;",
      [user.id, existingItem.rows[0].market_id],
    );

    if (!isAuthorized.rowCount) {
      throw new UnauthorizedError("Not authorized to delete item!");
    }

    // Delete the item from the database
    await pool.query("DELETE FROM items WHERE id = $1 RETURNING *", [itemId]);

    // Send success response
    res.status(StatusCodes.OK).json({
      message: "Item deleted successfully",
      success: true,
    });
  } catch (error) {
    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }
    
    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to delete item! Please try again.");
  }
};

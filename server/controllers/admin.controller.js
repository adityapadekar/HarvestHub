/**
 * Controller functions for admin related operations
 * @module adminController
 * @exports createAdmin
 * @exports createModerator
 * @exports getModerators
 * @exports deleteUser
 * @exports createMarket
 * @exports updateMarket
 * @exports deleteMarket
 * @exports updateMarketModeratorMapping
 * @exports createProduct
 * @exports updateProduct
 * @exports deleteProduct
 */

// Status codes package
const { StatusCodes } = require("http-status-codes");

// Crypto (native nodejs library) to perform hashing, encryption and decryption
const crypto = require("crypto");

// Connection pool used to connect to POSTGRESQL DATABASE
const { pool } = require("../db");

// Custom error classes
const { NotFoundError, BadRequestError, InternalServerError, CustomAPIError } = require("../errors");

// Utility functions
const { hashPassword } = require("../utils/password.util");
const { signJwt } = require("../utils/jsonwebtoken.util");
const { sendEmail } = require("../utils/email.util");
const { uploadBufferDataToCloudinary, deleteFromCloudinary } = require("../utils/cloudinary.util");

// Allowed values for certain fields
const allowedValues = require("../constants/allowed-values.constant");

/**
 * Controller function to create a new admin user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {BadRequestError} If an account already exists for the provided email or username
 * @throws {InternalServerError} If unable to create a new admin user
 */
module.exports.createAdmin = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    // Check if a user already exists with the provided email or username
    const existingUser = await pool.query("SELECT * FROM users WHERE username = $1 OR email = $2", [username, email]);

    // If user exists and is verified or not an admin, throw BadRequestError
    if (existingUser.rowCount > 0 && (existingUser.rows[0].is_verified || existingUser.rows[0].role !== "admin")) {
      throw new BadRequestError("Account already exists for this email or username!");
    }

    let user;
    // If no user exists, create a new one
    if (existingUser.rowCount === 0) {
      const hashedPassword = await hashPassword(password);

      user = await pool.query(
        "INSERT INTO users (name, username, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, username, email, hashedPassword, "admin"],
      );
    }

    // If user is not created, assign existing user, otherwise assign created user
    user = user === undefined ? existingUser.rows[0] : user.rows[0];

    // Generate a verification token
    const hash = crypto.randomBytes(64).toString("hex");
    const token = signJwt({ userId: user.id, email, hash }, "verification");

    // Delete any existing verification tokens for the user
    await pool.query("DELETE FROM verification_tokens WHERE user_id = $1", [user.id]);

    // Insert the new verification token into the database
    await pool.query("INSERT INTO verification_tokens (user_id, hash) VALUES ($1, $2)", [user.id, hash]);

    // Compose email subject and body for email verification
    const emailSubject = "Email verification";
    const emailBody = `Please click on the link below to verify your email address: ${process.env.FRONTEND_BASE_URL}/verify-email/${token}`;

    // Send the email verification link
    await sendEmail(email, emailSubject, emailBody);

    // Send response indicating successful admin creation
    res.status(StatusCodes.CREATED).json({
      message: "Admin created successful!",
      success: true,
    });
  } catch (error) {
    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to create new admin! Please try again.");
  }
};

/**
 * Controller function to create a new moderator user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {BadRequestError} If an account already exists for the provided email or username
 * @throws {InternalServerError} If unable to create a new moderator user
 */
module.exports.createModerator = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    // Check if a user already exists with the provided email or username
    const existingUser = await pool.query("SELECT * FROM users WHERE username = $1 OR email = $2", [username, email]);

    // If user exists and is verified or not a moderator, throw BadRequestError
    if (existingUser.rowCount > 0 && (existingUser.rows[0].is_verified || existingUser.rows[0].role !== "moderator")) {
      throw new BadRequestError("Account already exists for this email or username!");
    }

    let user;
    // If no user exists, create a new one
    if (existingUser.rowCount === 0) {
      const hashedPassword = await hashPassword(password);

      user = await pool.query(
        "INSERT INTO users (name, username, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, username, email, hashedPassword, "moderator"],
      );
    }

    // If user is not created, assign existing user, otherwise assign created user
    user = user === undefined ? existingUser.rows[0] : user.rows[0];

    // Generate a verification token
    const hash = crypto.randomBytes(64).toString("hex");
    const token = signJwt({ userId: user.id, email, hash }, "verification");

    // Delete any existing verification tokens for the user
    await pool.query("DELETE FROM verification_tokens WHERE user_id = $1", [user.id]);

    // Insert the new verification token into the database
    await pool.query("INSERT INTO verification_tokens (user_id, hash) VALUES ($1, $2)", [user.id, hash]);

    // Compose email subject and body for email verification
    const emailSubject = "Email verification";
    const emailBody = `Please click on the link below to verify your email address: ${process.env.FRONTEND_BASE_URL}/verify-email/${token}`;

    // Send the email verification link
    await sendEmail(email, emailSubject, emailBody);

    // Send response indicating successful moderator creation
    res.status(StatusCodes.CREATED).json({
      message: "Moderator created successful!",
      success: true,
    });
  } catch (error) {
    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to create new moderator! Please try again.");
  }
};

/**
 * Controller function to fetch moderators based on search criteria and pagination.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {InternalServerError} If unable to fetch moderators
 */
module.exports.getModerators = async (req, res) => {
  const { search, page } = req.query;
  try {
    let query =
      "SELECT u.id, u.name, u.username, u.email, u.contact_number, u.address FROM users AS u WHERE role = 'moderator'";
    const queryParam = [];

    // Add search condition if search parameter is provided
    if (search) {
      query +=
        " AND (u.name ILIKE $1 OR u.username ILIKE $1 OR u.email ILIKE $1 OR EXISTS (SELECT 1 FROM markets AS m JOIN moderator_market_mappings AS mmp ON m.id = mmp.market_id WHERE mmp.moderator_id = u.id AND m.market_name ILIKE $1))";

      queryParam.push(`%${search}%`);
    }

    // Pagination setup
    const pageLimit = 15;
    const pageNumber = page ? page : 1;
    const offset = (pageNumber - 1) * pageLimit;

    // Add pagination parameters to the query
    query += ` ORDER BY u.username OFFSET $${queryParam.length + 1} LIMIT $${queryParam.length + 2}`;
    queryParam.push(offset);
    queryParam.push(pageLimit);

    // Execute the query to fetch moderator data
    const moderator = await pool.query(query, queryParam);

    // Process each moderator data to fetch associated markets
    const updatedModeratorData = await Promise.all(
      moderator.rows.map(async (item) => {
        const marketData = await pool.query(
          "SELECT m.id, m.market_name, m.address, m.contact_number, ST_Y(m.geo_location::geometry) AS latitude, ST_X(m.geo_location::geometry) AS longitude, m.image_url, m.created_by, m.updated_by, m.created_at, m.updated_at FROM markets AS m JOIN moderator_market_mappings AS mmp ON m.id = mmp.market_id WHERE mmp.moderator_id = $1",
          [item.id],
        );

        // Combine moderator data with associated market data
        return {
          ...item,
          market: marketData.rows[0],
        };
      }),
    );

    // Send response with updated moderator data
    res.status(StatusCodes.OK).json({
      message: "Moderators fetched successfully!",
      success: true,
      result: updatedModeratorData,
    });
  } catch (error) {
    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to fetch moderators! Please try again.");
  }
};

/**
 * Controller function to delete a user by their ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {NotFoundError} If no user with the given ID is found
 * @throws {InternalServerError} If unable to delete the user
 */
module.exports.deleteUser = async (req, res) => {
  const { id: userId } = req.params;
  try {
    // Delete the user from the database
    const existingUser = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [userId]);

    // Check if a user was deleted
    if (!existingUser.rowCount) {
      throw new NotFoundError("No user with the given id");
    }

    // Send success response with information about the deleted user's role
    res.status(StatusCodes.OK).json({
      message: `User with id: ${existingUser.rows[0].id}, name: ${existingUser.rows[0].name} and role: ${existingUser.rows[0].role} deleted successfully!`,
      success: true,
    });
  } catch (error) {
    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to delete the user! Please try again.");
  }
};

/**
 * Controller function to create a new market.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {BadRequestError} If image upload fails or no image is provided, or if a market already exists with the same name
 * @throws {CustomAPIError} If a custom API error occurs during the process
 * @throws {InternalServerError} If unable to create the market
 */
module.exports.createMarket = async (req, res) => {
  const { marketName, address, contactNumber, latitude, longitude } = req.body;
  const user = req.user;
  const buffer = req.file?.buffer;
  const mimetype = req.file?.mimetype;

  const fileIsUploaded = buffer && mimetype && allowedValues.imageTypes.includes(mimetype);

  // Check if an image file is uploaded
  if (!fileIsUploaded) {
    throw new BadRequestError("Please upload image!");
  }

  let uploadedImage;
  try {
    // Check if a market already exists with the same name
    const existingMarket = await pool.query("SELECT * FROM markets WHERE LOWER(market_name) = LOWER($1)", [marketName]);

    // If markets exists, throw BadRequestError
    if (existingMarket.rowCount > 0) {
      throw new BadRequestError("Market already exists with this name!");
    }

    // Upload the image buffer to Cloudinary
    uploadedImage = await uploadBufferDataToCloudinary(buffer, "markets");

    // Insert the new market data into the database
    await pool.query(
      "INSERT INTO markets (market_name, address, contact_number, geo_location, image_url, image_public_id, created_by, updated_by) VALUES ($1, $2, $3, ST_POINT($4, $5), $6, $7, $8, $8)",
      [
        marketName,
        address,
        contactNumber,
        longitude,
        latitude,
        uploadedImage.secure_url,
        uploadedImage.public_id,
        user.id,
      ],
    );

    // Send success response
    res.status(StatusCodes.CREATED).json({
      message: "Market added successfully!",
      success: true,
    });
  } catch (error) {
    // If an image was uploaded, delete it from Cloudinary
    if (uploadedImage) {
      await deleteFromCloudinary(uploadedImage.public_id);
    }

    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to create market! Please try again.");
  }
};

/**
 * Controller function to update a market.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {BadRequestError} If no image is provided
 * @throws {NotFoundError} If the market does not exist
 * @throws {CustomAPIError} If a custom API error occurs during the process
 * @throws {InternalServerError} If unable to update the market
 */
module.exports.updateMarket = async (req, res) => {
  const { id: marketId } = req.params;
  const { marketName, address, contactNumber, latitude, longitude, image_url, image_public_id } = req.body;
  const user = req.user;
  const buffer = req.file?.buffer;
  const mimetype = req.file?.mimetype;

  // Check if an image is provided
  const imageProvided = buffer && mimetype && allowedValues.imageTypes.includes(mimetype);
  const imageUrlProvided = image_url && image_public_id;
  const imageAvailable = imageProvided || imageUrlProvided;
  if (!imageAvailable) {
    throw new BadRequestError("Please provide image!");
  }

  let uploadedImage;
  try {
    // Check if the market exists
    const market = await pool.query("SELECT * FROM markets WHERE id = $1", [marketId]);
    if (!market.rowCount) {
      throw new NotFoundError("Market does not exist!");
    }

    // Check if a market with the new name already exists
    const existingMarket = await pool.query("SELECT * FROM markets WHERE LOWER(market_name) = LOWER($1) AND id != $2", [
      marketName,
      marketId,
    ]);
    if (existingMarket.rowCount) {
      throw new BadRequestError("Market cannot be renamed to this name!");
    }

    // Upload the image buffer to Cloudinary if provided
    if (buffer && mimetype) {
      uploadedImage = await uploadBufferDataToCloudinary(buffer, "markets");
    }

    // Update the market information in the database
    await pool.query(
      "UPDATE markets SET market_name = $1, address = $2, contact_number = $3, geo_location = ST_POINT($4, $5),image_url = $6, image_public_id = $7, updated_by = $8, updated_at = NOW() WHERE id = $9 RETURNING market_name, address, contact_number, ST_Y(geo_location::geometry) AS latitude, ST_X(geo_location::geometry) AS longitude, image_url, image_public_id, created_by, updated_by, created_at, updated_at",
      [
        marketName,
        address,
        contactNumber,
        longitude,
        latitude,
        uploadedImage ? uploadedImage.secure_url : image_url,
        uploadedImage ? uploadedImage.public_id : image_public_id,
        user.id,
        marketId,
      ],
    );

    // Send success response
    res.status(StatusCodes.CREATED).json({
      message: "Market updated successfully!",
      success: true,
    });
  } catch (error) {
    // If an image was uploaded, delete it from Cloudinary
    if (uploadedImage) {
      await deleteFromCloudinary(uploadedImage.public_id);
    }

    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to update market! Please try again.");
  }
};

/**
 * Controller function to delete a market.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {NotFoundError} If the market does not exist
 * @throws {CustomAPIError} If a custom API error occurs during the process
 * @throws {InternalServerError} If unable to delete the market
 */
module.exports.deleteMarket = async (req, res) => {
  const { id: marketId } = req.params;

  try {
    // Delete the market from the database
    const marketDeleted = await pool.query("DELETE FROM markets WHERE id = $1 RETURNING *", [marketId]);

    // If no market was deleted, throw a NotFoundError
    if (!marketDeleted.rowCount) {
      throw new NotFoundError("Market does not exist!");
    }

    // Delete the market image from Cloudinary
    await deleteFromCloudinary(marketDeleted.rows[0].image_public_id);

    // Send success response
    return res.status(StatusCodes.OK).json({
      message: "Market deleted successfully!",
      success: true,
    });
  } catch (error) {
    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to delete market! Please try again.");
  }
};

/**
 * Controller function to update moderator-market mappings.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {BadRequestError} If the moderator or market with the given id doesn't exist, or if the moderator is already assigned a market (for 'assign' operation), or if the moderator is not assigned any market (for 'reassign' operation)
 * @throws {CustomAPIError} If a custom API error occurs during the process
 * @throws {InternalServerError} If unable to update the moderator-market mapping
 */
module.exports.updateMarketModeratorMapping = async (req, res) => {
  const { moderatorId, marketId, operation } = req.body;

  try {
    // Check if the moderator exists and is a moderator
    const existingUser = await pool.query("SELECT * FROM users WHERE id = $1", [moderatorId]);

    // If user does not exists, is verified or not an moderator, throw BadRequestError
    if (!existingUser.rowCount || !existingUser.rows[0].is_verified || existingUser.rows[0].role !== "moderator") {
      throw new BadRequestError("No moderator with the given id!");
    }

    // Check if the market exists
    const existingMarket = await pool.query("SELECT * FROM markets WHERE id = $1", [marketId]);

    // If market does not exists, throw BadRequestError
    if (!existingMarket.rowCount) {
      throw new BadRequestError("No market with the given id!");
    }

    if (operation === "assign") {
      // Check if the moderator is already assigned a market
      const existingMapping = await pool.query("SELECT * FROM moderator_market_mappings WHERE moderator_id = $1", [
        moderatorId,
      ]);

      // If mapping already exists, throw BadRequestError
      if (existingMapping.rowCount) {
        throw new BadRequestError("Moderator is already assigned a market!");
      }

      // Assign the market to the moderator
      await pool.query("INSERT INTO moderator_market_mappings (moderator_id, market_id) VALUES ($1, $2)", [
        moderatorId,
        marketId,
      ]);
    } else if (operation === "reassign") {
      // Reassign the market to the moderator
      const existingMapping = await pool.query(
        "UPDATE moderator_market_mappings SET market_id = $1 WHERE moderator_id = $2 RETURNING *",
        [marketId, moderatorId],
      );

      // If mapping does not exists, throw BadRequestError
      if (!existingMapping.rowCount) {
        throw new BadRequestError("Moderator is not assigned any market!");
      }
    } else if (operation === "unassign") {
      // Unassign the market from the moderator
      await pool.query("DELETE FROM moderator_market_mappings WHERE moderator_id = $1 RETURNING *", [moderatorId]);
    }

    // Send success response
    res.status(StatusCodes.CREATED).json({
      message: `Moderator market ${operation}ment successful!`,
      success: true,
    });
  } catch (error) {
    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError(`Unable to ${operation} market to moderator! Please try again.`);
  }
};

/**
 * Controller function to create a new product.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {BadRequestError} If the product already exists or if no image is uploaded
 * @throws {InternalServerError} If unable to create the product
 * @throws {CustomAPIError} If a custom API error occurs during the process
 */
module.exports.createProduct = async (req, res) => {
  const { productName, productType, unit } = req.body;
  const user = req.user;
  const buffer = req.file?.buffer;
  const mimetype = req.file?.mimetype;

  // Check if an image is uploaded
  const fileIsUploaded = buffer && mimetype && allowedValues.imageTypes.includes(mimetype);
  if (!fileIsUploaded) {
    throw new BadRequestError("Please upload an image!");
  }

  let uploadedImage;
  try {
    // Check if the product already exists
    const existingProduct = await pool.query("SELECT * FROM products WHERE LOWER(product_name) = LOWER($1)", [
      productName,
    ]);

    // Is product exists, throw BadRequestError
    if (existingProduct.rowCount > 0) {
      throw new BadRequestError("Product already exists!");
    }

    // Upload the image to Cloudinary
    uploadedImage = await uploadBufferDataToCloudinary(buffer, "defaultImages");

    // Insert the new product into the database
    await pool.query(
      "INSERT INTO products (product_name, product_type, unit, image_url, image_public_id, created_by, updated_by) VALUES ($1, $2, $3, $4, $5, $6, $6)",
      [productName, productType, unit, uploadedImage.url, uploadedImage.public_id, user.id],
    );

    // Send success response
    res.status(StatusCodes.CREATED).json({
      message: "Product created successfully!",
      success: true,
    });
  } catch (error) {
    // If an image was uploaded, delete it from Cloudinary
    if (uploadedImage) {
      await deleteFromCloudinary(uploadedImage.public_id);
    }
    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }
    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to create product! Please try again.");
  }
};

/**
 * Controller function to update an existing product.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {BadRequestError} If no image is provided
 * @throws {NotFoundError} If the product does not exist
 * @throws {BadRequestError} If the product cannot be renamed to the provided name
 * @throws {InternalServerError} If unable to update the product
 * @throws {CustomAPIError} If a custom API error occurs during the process
 */
module.exports.updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const { productName, productType, unit, image_url, image_public_id } = req.body;
  const user = req.user;
  const buffer = req.file?.buffer;
  const mimetype = req.file?.mimetype;

  // Check if an image is provided
  const imageProvided = buffer && mimetype && allowedValues.imageTypes.includes(mimetype);
  const imageUrlProvided = image_url && image_public_id;
  const imageAvailable = imageProvided || imageUrlProvided;
  if (!imageAvailable) {
    throw new BadRequestError("Please provide an image!");
  }

  let uploadedImage;
  try {
    // Check if the product exists
    const product = await pool.query("SELECT * FROM products WHERE id = $1", [productId]);
    if (!product.rowCount) {
      throw new NotFoundError("Product does not exist!");
    }

    // Check if the product can be renamed to the provided name
    const existingProduct = await pool.query(
      "SELECT * FROM products WHERE LOWER(product_name) = LOWER($1) AND id != $2",
      [productName, productId],
    );
    if (existingProduct.rowCount) {
      throw new BadRequestError("Product cannot be renamed to this name!");
    }

    // Upload the image to Cloudinary if provided
    if (buffer && mimetype) {
      uploadedImage = await uploadBufferDataToCloudinary(buffer, "defaultImages");
    }

    // Update the product in the database
    await pool.query(
      "UPDATE products SET product_name = $1, product_type = $2, unit = $3, image_url = $4, image_public_id = $5, updated_by = $6, updated_at = NOW() WHERE id = $7 RETURNING *",
      [
        productName,
        productType,
        unit,
        uploadedImage ? uploadedImage.secure_url : image_url,
        uploadedImage ? uploadedImage.public_id : image_public_id,
        user.id,
        productId,
      ],
    );

    // Send success response
    res.status(StatusCodes.CREATED).json({
      message: "Product updated successfully!",
      success: true,
    });
  } catch (error) {
    // If an image was uploaded, delete it from Cloudinary
    if (uploadedImage) {
      await deleteFromCloudinary(uploadedImage.public_id);
    }

    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to update product! Please try again.");
  }
};

/**
 * Controller function to delete a product.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {NotFoundError} If the product does not exist
 * @throws {InternalServerError} If unable to delete the product
 * @throws {CustomAPIError} If a custom API error occurs during the process
 */
module.exports.deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  try {
    // Delete the product from the database
    const productDeleted = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [productId]);

    // If no product was deleted, throw a NotFoundError
    if (!productDeleted.rowCount) {
      throw new NotFoundError("Product does not exist!");
    }

    // Delete the product image from Cloudinary
    await deleteFromCloudinary(productDeleted.rows[0].image_public_id);

    // Send success response
    return res.status(StatusCodes.OK).json({
      message: "Product deleted successfully!",
      success: true,
    });
  } catch (error) {
    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }
    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to delete product! Please try again.");
  }
};

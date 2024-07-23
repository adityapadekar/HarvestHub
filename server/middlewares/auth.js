/**
 * Middleware functions for authentication.
 * @exports protect
 * @exports authorize
 */

// Connection pool used to connect to POSTGRESQL DATABASE
const { pool } = require("../db");

// Custom error classes
const { UnauthorizedError, NotFoundError, BadRequestError, ForbiddenError, InternalServerError } = require("../errors");

// Utility functions
const { verifyJwt } = require("../utils/jsonwebtoken.util");

/**
 * Middleware to ensure that certain routes are protected.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @throws {UnauthorizedError} No token provided or invalid/expired token
 * @throws {NotFoundError} Token payload is invalid
 * @throws {BadRequestError} Email of the user is not verified
 */
module.exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the token is provided and is valid
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("No token provided!");
  }

  // Extract and Verify JWT
  const token = await verifyJwt(authHeader.split(" ")[1]);

  if (!token.success) {
    throw new UnauthorizedError("Not authorized to access this route!");
  }

  // Verify if the token payload is valid and the user is verified or not
  const user = await pool.query(
    "SELECT id, name, username, email, password, contact_number, address, role, is_verified FROM users WHERE id = $1",
    [token.payload.userId],
  );

  if (!user.rowCount) {
    throw new NotFoundError("Invalid credentials!");
  }

  if (!user.rows[0].is_verified) {
    throw new BadRequestError("Please verify your email!");
  }

  // Add user payload as object in the request
  req.user = user.rows[0];

  // Pass the execution to next middleware or controller
  next();
};

/**
 * Middleware to restrict routes to users with required privileges.
 * @param {...string} roles - Roles that are authorized to access the route
 * @throws {ForbiddenError} If the user does not have required privileges
 * @throws {InternalServerError} If something unexpected happens
 * @returns {Function} Function that performs authorization process
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // Check if the user is authorized to access this route
    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError(`User with role ${req.user.role} is not authorized to access this route`);
    }

    // Pass the execution to next middleware or controller
    next();
  };
};

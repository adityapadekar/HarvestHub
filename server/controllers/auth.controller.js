/**
 * Controller functions for authentication related operations
 * @module authController
 * @exports signUp
 * @exports login
 * @exports fetchUserDetails
 * @exports updateProfile
 * @exports changePassword
 * @exports verifyEmail
 * @exports generateForgotPasswordLink
 * @exports resetPassword
 */

// Status codes package
const { StatusCodes } = require("http-status-codes");

// Crypto (native nodejs library) to perform hashing, encryption and decryption
const crypto = require("crypto");

// Connection pool used to connect to POSTGRESQL DATABASE
const { pool } = require("../db");

// Custom error classes
const { NotFoundError, BadRequestError, UnauthorizedError, InternalServerError, CustomAPIError } = require("../errors");

// Utility functions
const { hashPassword, checkPassword } = require("../utils/password.util");
const { signJwt, verifyJwt } = require("../utils/jsonwebtoken.util");
const { sendEmail } = require("../utils/email.util");
const { validate } = require("../utils/validator.util");

// Input validation schemas
const { emailVerificationSchema, forgotPasswordTokenSchema } = require("../validators/auth.validator");

/**
 * Controller function for user signup.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {BadRequestError} If an account already exists for the provided email or username
 * @throws {InternalServerError} If an unexpected error occurs
 */
module.exports.signUp = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    // Check if a user already exists with the provided username or email
    const existingUser = await pool.query("SELECT * FROM users WHERE username = $1 OR email = $2", [username, email]);

    // If an existing user is found and their account is verified, throw BadRequestError
    if (existingUser.rowCount > 0 && existingUser.rows[0].is_verified) {
      throw new BadRequestError("Account already exists for this email or username!");
    }

    let user;

    // If no existing user found, create a new user
    if (existingUser.rowCount === 0) {
      // Hash the password before saving
      const hashedPassword = await hashPassword(password);

      // Create a new user
      user = await pool.query(
        "INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, username, email, hashedPassword],
      );
    }

    // If user was created, set 'user' to the newly created user, otherwise set it to the existing user
    user = user === undefined ? existingUser.rows[0] : user.rows[0];

    // Generate a random hash
    const hash = crypto.randomBytes(64).toString("hex");

    // Generate a verification token
    const token = signJwt({ userId: user.id, email, hash }, "verification");

    // Delete any existing verification tokens for the user
    await pool.query("DELETE FROM verification_tokens WHERE user_id = $1", [user.id]);

    // Insert the new verification token into the database
    await pool.query("INSERT INTO verification_tokens (user_id, hash) VALUES ($1, $2)", [user.id, hash]);

    // Compose email subject and body for email verification
    const emailSubject = "Email verification";
    const emailBody = `Please click on the link below to verify your email address: ${process.env.FRONTEND_BASE_URL}/verify-email/${token}`;

    // Send email verification
    await sendEmail(email, emailSubject, emailBody);

    // Send response indicating successful signup
    res.status(StatusCodes.CREATED).json({
      message: "Signup successful!",
      success: true,
    });
  } catch (error) {
    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to sign up user! Please try again.");
  }
};

/**
 * Controller function for user login.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {UnauthorizedError} If the provided credentials are invalid
 * @throws {BadRequestError} If the user's email is not verified
 * @throws {InternalServerError} If an unexpected error occurs
 */
module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch user from the database based on the provided username
    const fetchedUser = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

    // Check if the user exists in the database
    if (fetchedUser.rowCount === 0) {
      throw new UnauthorizedError("Invalid credentials!");
    }

    // Check if the provided password matches the hashed password stored in the database
    const isPasswordValid = await checkPassword(password, fetchedUser.rows[0].password);

    // If the password is invalid, throw UnauthorizedError
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid credentials!");
    }

    // Check if the user's email is verified
    if (!fetchedUser.rows[0].is_verified) {
      throw new BadRequestError("Please verify your email!");
    }

    // Extract user information
    const user = fetchedUser.rows[0];

    // Generate JWT payload
    const jwtPayload = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };

    // Sign JWT token
    const token = signJwt(jwtPayload, "access");

    // Send response with login success message, user information, and JWT token
    res.status(StatusCodes.OK).json({
      message: "Login successful!",
      success: true,
      result: {
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        token: token,
      },
    });
  } catch (error) {
    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to login user! Please try again.");
  }
};

/**
 * Controller function to fetch user details.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {InternalServerError} If an unexpected error occurs during user details fetching process
 */
module.exports.fetchUserDetails = async (req, res) => {
  const user = req.user;

  try {
    let market;
    if (user.role === "moderator") {
      // Fetch market details for moderator user
      market = await pool.query(
        "SELECT m.id, m.market_name, m.address, m.contact_number, ST_Y(m.geo_location::geometry) AS latitude, ST_X(m.geo_location::geometry) AS longitude, m.image_url, m.image_public_id, m.created_by, m.updated_by, m.created_at, m.updated_at FROM markets AS m JOIN moderator_market_mappings AS mmp ON m.id = mmp.market_id WHERE mmp.moderator_id = $1",
        [user.id],
      );
    }

    // Send response with user details and market details (if applicable)
    res.status(StatusCodes.OK).json({
      message: "User fetched successfully!",
      success: true,
      result: market?.rowCount ? { ...user, market: market.rows[0] } : user,
    });
  } catch (error) {
    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to fetch user details! Please try again.");
  }
};

/**
 * Controller function to update user profile.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {InternalServerError} If an unexpected error occurs during profile update process
 */
module.exports.updateProfile = async (req, res) => {
  const { name, contactNumber, address } = req.body;
  const user = req.user;

  try {
    // Update user profile in the database
    await pool.query("UPDATE users SET (name, contact_number, address) = ($1, $2, $3)  WHERE id = $4", [
      name,
      contactNumber,
      address,
      user.id,
    ]);

    // Send response indicating successful profile update
    return res.status(StatusCodes.OK).json({
      message: "User profile updated successfully!",
      success: true,
    });
  } catch (error) {
    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to update user profile! Please try again.");
  }
};

/**
 * Controller function to change user password.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {UnauthorizedError} If the old password provided does not match the user's current password
 * @throws {InternalServerError} If an unexpected error occurs during password change process
 */
module.exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = req.user;

  try {
    // Check if the old password provided matches the user's current password
    const isOldPasswordCorrect = await checkPassword(oldPassword, user.password);

    if (!isOldPasswordCorrect) {
      throw new UnauthorizedError("Old password does not match!");
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update user's password in the database
    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [hashedPassword, user.id]);

    // Send response indicating successful password change
    res.status(StatusCodes.OK).json({
      message: "Password changed successfully!",
      success: true,
    });
  } catch (error) {
    // If it's a custom API error (UnauthorizedError), re-throw it
    if (error instanceof UnauthorizedError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to change password! Please try again.");
  }
};

/**
 * Controller function to verify user email using a verification token.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {BadRequestError} If the provided token is invalid
 * @throws {NotFoundError} If the token or user associated with the token is not found
 * @throws {InternalServerError} If an unexpected error occurs during email verification process
 */
module.exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    // Decode the JWT token
    const decodedToken = verifyJwt(token);

    // If the token is invalid, throw BadRequestError
    if (!decodedToken.success) {
      throw new BadRequestError("Invalid token!");
    }

    // Validate the decoded token against email verification schema
    await validate(emailVerificationSchema, decodedToken.payload);

    const { userId, email, hash } = decodedToken.payload;

    // Fetch user from the database based on user ID and email
    const fetchedUser = await pool.query("SELECT * FROM users WHERE id = $1 AND email = $2", [userId, email]);

    // If user not found, throw NotFoundError
    if (!fetchedUser.rowCount) {
      throw new NotFoundError("Invalid Token!");
    }

    const user = fetchedUser.rows[0];

    // If user is not verified
    if (!user.is_verified) {
      // Fetch verification token from the database
      const verificationToken = await pool.query("SELECT * FROM verification_tokens WHERE user_id = $1", [userId]);

      // If verification token not found, throw NotFoundError
      if (!verificationToken.rowCount) {
        throw new NotFoundError("Invalid Token!");
      }

      // If the hash from the verification token does not match the hash from the decoded token, throw BadRequestError
      if (verificationToken.rows[0].hash !== hash) {
        throw new BadRequestError("Invalid token!");
      }

      // Update user's is_verified status to true in the database
      await pool.query("UPDATE users SET is_verified = true WHERE id = $1 AND email = $2", [userId, email]);

      // Delete verification token from the database
      await pool.query("DELETE FROM verification_tokens WHERE user_id = $1", [userId]);
    }

    // Send response indicating successful email verification
    res.status(StatusCodes.OK).json({
      message: "Email verified successfully!",
      success: true,
    });
  } catch (error) {
    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to verify email! Please try again.");
  }
};

/**
 * Controller function to generate a password reset link and send it to the user's email.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {NotFoundError} If no user with the provided email exists or the user's email is not verified
 * @throws {InternalServerError} If an unexpected error occurs during password reset link generation process
 */
module.exports.generateForgotPasswordLink = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if a user with the provided email exists and their email is verified
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    // If no user found or user's email is not verified, throw NotFoundError
    if (!existingUser.rowCount || !existingUser.rows[0].is_verified) {
      throw new NotFoundError("Invalid credentials!");
    }

    const user = existingUser.rows[0];

    // Delete any existing verification tokens for the user
    await pool.query("DELETE FROM verification_tokens WHERE user_id = $1", [user.id]);

    // Generate a random hash
    const hash = crypto.randomBytes(64).toString("hex");

    // Generate a verification token
    const token = signJwt({ userId: user.id, email, hash }, "verification");

    // Insert the new verification token into the database
    await pool.query("INSERT INTO verification_tokens (user_id, hash) VALUES ($1, $2)", [user.id, hash]);

    // Compose email subject and body for password reset link
    const emailSubject = "Password Reset Link";
    const emailBody = `Hi ${user.name},\nClick on the link below to reset your password\n${process.env.FRONTEND_BASE_URL}/reset-password/${token}`;

    // Send email with password reset link
    await sendEmail(email, emailSubject, emailBody);

    // Send response indicating successful password reset link generation
    res.status(StatusCodes.OK).json({
      message: "Reset password link sent to your email!",
      success: true,
    });
  } catch (error) {
    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to generate password reset link! Please try again.");
  }
};

/**
 * Controller function to reset user password using a reset token.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws {BadRequestError} If the provided token is invalid
 * @throws {NotFoundError} If the token or user associated with the token is not found
 * @throws {UnauthorizedError} If the token provided is not authorized
 * @throws {InternalServerError} If an unexpected error occurs during password reset process
 */
module.exports.resetPassword = async (req, res) => {
  const token = req.query.token;

  const { password } = req.body;

  try {
    // Verify the JWT token
    const decodedToken = verifyJwt(token);

    // If the token is invalid, throw BadRequestError
    if (!decodedToken.success) {
      throw new BadRequestError("Invalid token!");
    }

    // Validate the decoded token against forgot password token schema
    await validate(forgotPasswordTokenSchema, decodedToken.payload);

    const { userId, hash } = decodedToken.payload;

    // Fetch user from the database based on user ID
    const fetchedUser = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);

    // If user not found, throw NotFoundError
    if (!fetchedUser.rowCount) {
      throw new NotFoundError("Invalid token!");
    }

    // Fetch verification token from the database based on user ID
    const verificationToken = await pool.query("SELECT * FROM verification_tokens WHERE user_id = $1", [userId]);

    // If verification token not found, throw BadRequestError
    if (!verificationToken.rowCount) {
      throw new BadRequestError("Invalid token!");
    }

    // If the hash from the verification token does not match the hash from the decoded token, throw UnauthorizedError
    if (verificationToken.rows[0].hash !== hash) {
      throw new UnauthorizedError("Invalid token!");
    }

    // Hash the new password
    const hashedPassword = await hashPassword(password);

    // Update user's password in the database
    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [hashedPassword, userId]);

    // Delete verification token from the database
    await pool.query("DELETE FROM verification_tokens WHERE user_id = $1", [userId]);

    // Send response indicating successful password reset
    return res.status(StatusCodes.OK).json({
      message: "Password reset successfully!",
      success: true,
    });
  } catch (error) {
    // If it's a custom API error, re-throw it
    if (error instanceof CustomAPIError) {
      throw error;
    }

    // Otherwise, throw an Internal Server Error
    throw new InternalServerError("Unable to reset password! Please try again.");
  }
};

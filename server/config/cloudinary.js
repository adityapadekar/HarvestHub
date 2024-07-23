/**
 * Configuration for Cloudinary module.
 * @exports cloudinaryConfiguration - Configuration object for Cloudinary.
 */

const cloudinary = require("cloudinary").v2;

/**
 * Cloudinary configuration object.

 */
const cloudinaryConfiguration = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
};

// Configure Cloudinary with the provided settings
cloudinary.config(cloudinaryConfiguration);

module.exports = { cloudinary };

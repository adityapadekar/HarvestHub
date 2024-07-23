/**
 * Utility functions module for uploading and deleting images to/from Cloudinary.
 * @exports uploadBufferDataToCloudinary
 * @exports deleteFromCloudinary
 */

// Cloudinary configuration object
const { cloudinary } = require("../config/cloudinary");

// Custom error classes
const { InternalServerError } = require("../errors");

/**
 * Uploads image buffer to Cloudinary.
 * @param {ArrayBuffer} buffer - The image file to be uploaded
 * @param {string} folder - The folder in which the image is to be stored
 * @returns {Promise<Object>} Object containing response from Cloudinary
 * @throws {Error} If image upload fails
 */
module.exports.uploadBufferDataToCloudinary = async (buffer, folder) => {
  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          upload_preset: "harvesthub0",
          folder: `HarvestHub/${folder}`,
        },
        (error, uploadResult) => {
          if (error) {
            return reject(error);
          }
          return resolve(uploadResult);
        },
      )
      .end(buffer);
  });

  return uploadResult;
};

/**
 * Deletes image from Cloudinary.
 * @param {string} publicId - Public id of the image to be deleted from Cloudinary
 * @throws {InternalServerError} If image deletion fails
 */
module.exports.deleteFromCloudinary = async (publicId) => {
  const result = await cloudinary.uploader.destroy(publicId);

  if (result.result !== "ok" && result.result !== "not found") {
    throw new InternalServerError("Unable to delete image from cloudinary!");
  }
};

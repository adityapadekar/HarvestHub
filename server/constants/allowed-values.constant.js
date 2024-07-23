/**
 * This module defines and exports arrays representing various data types used within the application.
 * @module allowedValues
 * @exports imageTypes
 * @exports productTypes
 * @exports productSizes
 * @exports productUnits
 * @exports marketModeratorMappingOperations
 */

/**
 * Array containing supported image MIME types.
 * @type {string[]}
 * @description This array lists the MIME types of images supported by the application.
 */
module.exports.imageTypes = ["image/png", "image/jpeg", "image/jpg"];

/**
 * Array containing types of products.
 * @type {string[]}
 * @description This array specifies the types of products available, such as vegetables or fruits.
 */
module.exports.productTypes = ["vegetable", "fruit"];

/**
 * Array containing sizes of products.
 * @type {string[]}
 * @description This array lists the sizes available for products, such as small, regular, or large.
 */
module.exports.productSizes = ["small", "regular", "large"];

/**
 * Array containing units of products.
 * @type {string[]}
 * @description This array specifies the units used for pricing products, such as per gram, per kilogram, etc.
 */
module.exports.productUnits = ["Rs/Gram", "Rs/Kg", "Rs/Quintal", "Rs/Tonne"];

/**
 * Array containing operations for market moderator mapping.
 * @type {string[]}
 * @description This array lists the operations available for market moderator mapping, such as assign, unassign, or reassign.
 */
module.exports.marketModeratorMappingOperations = ["assign", "unassign", "reassign"];

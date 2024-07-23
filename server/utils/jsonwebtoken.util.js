/**
 * Utility functions module for signing and verifying JsonWebTokens.
 * @exports signJwt
 * @exports verifyJwt
 */

const jwt = require("jsonwebtoken");

/**
 * @constant {Object} expireTime - Fixed expiration times for JWTs used for different purposes.
 * @description Different expiration times for JWTs used for different purposes.
 */
const expireTime = {
  access: "30d",
  verification: "15m",
};

/**
 * Encrypts given payload into a JSON Web Token to be used for a particular purpose.
 * @param {object} payload - Data to be encrypted in the JWT
 * @param {string} type - Purpose or type of JSON Web Token
 * @returns {string} Encrypted JSON Web Token
 */
module.exports.signJwt = (payload, type) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expireTime[type],
    issuer: "HarvestHub",
  });
  return token;
};

/**
 * Verifies the provided JSON Web Token.
 * @param {string} jwtToken - JSON Web Token to be verified
 * @returns {Object} Object specifying the validity of the token and the associated payload with it
 */
module.exports.verifyJwt = (jwtToken) => {
  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    return { payload: decoded, success: true };
  } catch (error) {
    return { payload: null, success: false };
  }
};

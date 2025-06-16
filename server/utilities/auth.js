const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SERVER_PRIVATE_KEY } = process.env;

/**
 * Compare user password to database data
 * @param {string} password 
 * @param {string} hash 
 */
const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

/**
 * Hash user password
 * @param {string} password 
 */
const hashPassword = (password) => {
    return bcrypt.hashSync(password);
}

/**
 * Generate user JWT
 * @param {object} payload
 */
const generateUserToken = (payload) => {
    return jwt.sign(payload, SERVER_PRIVATE_KEY);
}

/**
 * Verofy user JWT
 * @param {string} token 
 * @returns 
 */
const verifyUserToken = (token) => {
    return jwt.verify(token, SERVER_PRIVATE_KEY);
}

module.exports = {
    comparePassword,
    hashPassword,
    generateUserToken,
    verifyUserToken,
}
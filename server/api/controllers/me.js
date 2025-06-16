const { User } = require("../../db");
const { outError } = require("../../utilities/errors")

/**
 * Get current user information
 * @param {Request} req
 * @param {Response} res
 */
const getMeInfo = async (req, res) => {
    const user = req.user;

    return res.status(200).json(user);
}

module.exports = {
    getMeInfo,
}
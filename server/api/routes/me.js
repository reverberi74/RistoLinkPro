const express = require("express");
const app = express.Router();

const { getMeInfo } = require("../controllers/me");
const { authUser } = require("../../middleware/auth");

/**
 * @path /api/me
 * @method GET
 */
app.get("/", authUser(["user", "mod", "business"]), getMeInfo);

module.exports = app;
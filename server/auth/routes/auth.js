const express = require("express");
const app = express.Router();

const { login } = require("../controllers/auth");

/**
 * @path /auth/login
 * @method POST
 */
app.post("/", login);

module.exports = app;
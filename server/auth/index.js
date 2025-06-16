const express = require("express");
const app = express.Router();

/**
 * @path /auth/login
 */
app.use("/login", require("./routes/auth"));

module.exports = app;
const express = require("express");
const app = express.Router();

const { createUser } = require("../controllers/users");

/**
 * @path /api/users
 * @method POST
 */
app.post("/", createUser);

module.exports = app;
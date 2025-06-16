const express = require("express");
const { createCategory, getAllCategories, getCategoryById } = require("../controllers/categories");
const { authUser } = require("../../middleware/auth");
const app = express.Router();

/**
 * @path /api/categories/:business_id
 * @method GET
 */
app.get("/:business_id", authUser(), getAllCategories);

/**
 * @path /api/categories/:business_id/:category_id
 * @method GET
 */
app.get("/:business_id/:category_id", authUser(), getCategoryById);

/**
 * @path /api/categories
 * @method POST
 */
app.post("/", authUser(["business"]), createCategory);

/**
 * @path /api/categories/:category_id
 * @method PUT
 */
app.put("/:category_id", authUser(["business"]), );

/**
 * @path /api/categories/:category_id
 * @method DELETE
 */
app.delete("/:category_id", authUser(["business"]), );

module.exports = app;
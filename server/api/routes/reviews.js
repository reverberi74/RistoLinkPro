const express = require("express");
const app = express.Router();

const { authUser } = require("../../middleware/auth");
const { getReviews, getReviewById, createReview } = require("../controllers/reviews");

/**
 * @path /api/reviews
 * @method GET
 */
app.get("/", authUser(["business"]), getReviews);

/**
 * @path /api/reviews/:review_id
 * @method GET
*/
app.get("/:review_id", authUser(["business"]), getReviewById);

/**
 * @path /api/reviews
 * @method POST
 */
app.post("/", authUser(["user"]), createReview);

module.exports = app;
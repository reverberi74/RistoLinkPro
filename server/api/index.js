const express = require("express");
const app = express.Router();

/**
 * @path /api/users
 */
app.use("/users", require("./routes/users"));

/**
 * @path /api/me
 */
app.use("/me", require("./routes/me"));

/**
 * @path /api/categories
 */
app.use("/categories", require("./routes/categories"));

/**
 * @path /api/products
 */
app.use("/products", require("./routes/products"));

/**
 * @path /api/search
 */
app.use("/search", require("./routes/search"));

/**
 * @path /api/reviews
 */
app.use("/reviews", require("./routes/reviews"));

try {
  app.use("/cart", require("./routes/cartRoutes"));
} catch (err) {
  console.error("Errore nella route /cart:", err);
}

try {
  app.use("/orders", require("./routes/orderRoutes"));  
} catch (err) {
  console.error("Errore nella route /orders:", err);
}

module.exports = app;
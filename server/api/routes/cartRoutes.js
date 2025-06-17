const express = require("express");
const router = express.Router();
const { authUser } = require("../../middleware/auth");

const {
  getCart,
  addToCart,
  removeItem,
  clearCart,
  updateCartItem
} = require("../controllers/cartController");

// ✅ PUT /api/cart/:id → aggiorna la quantità di un prodotto nel carrello
router.put("/:id", authUser(["user"]), updateCartItem);

// ✅ GET /api/cart/:userId → recupera tutti gli articoli nel carrello dell'utente
router.get("/:userId", getCart);

// ✅ POST /api/cart → aggiunge un articolo al carrello
router.post("/", addToCart);

// ✅ DELETE /api/cart/:itemId → rimuove un articolo dal carrello
router.delete("/:itemId", removeItem);

// ✅ DELETE /api/cart/user/:userId → svuota il carrello dell'utente
router.delete("/user/:userId", clearCart);

module.exports = router;

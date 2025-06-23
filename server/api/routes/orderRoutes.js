const express = require("express");
const router = express.Router();
const { authUser } = require("../../middleware/auth");
const {
  createOrderFromCart,
  getActiveOrdersByUser,
  getOrderById,
  updateItemStatus,
  markOrderAsPaid,
  getAllOrders,
} = require("../controllers/orderController");

// POST /api/orders → crea nuovo ordine (user)
router.post("/", authUser(["user"]), createOrderFromCart);

// GET /api/orders/user/:userId → ottieni ordini attivi per utente (user)
router.get("/user/:userId", authUser(["user"]), getActiveOrdersByUser);

// PUT /api/orders/:orderId/item/:itemId → aggiorna stato piatto (business)
router.put("/:orderId/item/:itemId", authUser(["business"]), updateItemStatus);

// PUT /api/orders/:orderId/paid → segna ordine come pagato (user)
router.put("/:orderId/paid", authUser(["user"]), markOrderAsPaid);

// GET /api/orders/all → ottieni tutti gli ordini (business)
router.get("/all", authUser(["business"]), getAllOrders);

// GET /api/orders/:orderId → recupera ordine per ID (user)
router.get("/:orderId", authUser(["user"]), getOrderById);



module.exports = router;

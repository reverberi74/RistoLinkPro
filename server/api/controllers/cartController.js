const Cart = require("../../db/models/Cart");

// GET /api/cart/:userId → Recupera gli articoli del carrello per un dato utente
const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.params.userId });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Errore nel recupero del carrello" });
  }
};

// POST /api/cart → Aggiunge un prodotto al carrello (o aggiorna se già presente)
const addToCart = async (req, res) => {
  try {
    const { userId, productId, name, price, quantity, image } = req.body;

    const existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.json(existingItem);
    }

    const newItem = await Cart.create({ userId, productId, name, price, quantity, image });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Errore nell'aggiunta al carrello" });
  }
};

// DELETE /api/cart/:itemId → Rimuove un singolo prodotto dal carrello
const removeItem = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.itemId);
    res.json({ message: "Prodotto rimosso dal carrello" });
  } catch (error) {
    res.status(500).json({ message: "Errore nella rimozione del prodotto" });
  }
};

// DELETE /api/cart/user/:userId → Svuota tutto il carrello dell'utente
const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Svuotamento carrello per userId:", userId);

    if (!userId) {
      return res.status(400).json({ message: "userId mancante" });
    }

    await Cart.deleteMany({ userId });
    res.json({ message: "Carrello svuotato" });
  } catch (error) {
    console.error("Errore nello svuotamento del carrello:", error);
    res.status(500).json({ message: "Errore nello svuotamento del carrello" });
  }
};

// PUT /api/cart/:id → Aggiorna la quantità di un prodotto specifico nel carrello
// PUT /api/cart/:id → Aggiorna quantità in base all’_id del carrello
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "La quantità deve essere almeno 1" });
    }

    const updatedItem = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Elemento del carrello non trovato" });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error("Errore nell'aggiornamento della quantità:", error);
    res.status(500).json({ message: "Errore del server" });
  }
};

// ✅ Esportazione unificata
module.exports = {
  getCart,
  addToCart,
  removeItem,
  clearCart,
  updateCartItem,
};

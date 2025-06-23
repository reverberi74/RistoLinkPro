const { Order } = require("../../db");
const { outError } = require("../../utilities/errors");

/**
 * Crea un nuovo ordine a partire dal carrello utente
 */
const createOrderFromCart = async (req, res) => {
  const userId = req.user._id;
  const { items, subtotal, taxes, service, tip, total, tableNumber } = req.body;

  // Imposta "preparing" su ogni item
  const itemsWithStatus = items.map((item) => ({
    ...item,
    status: "preparing"
  }));

  try {
    const newOrder = await Order.create({
      userId,
      items: itemsWithStatus,
      subtotal,
      taxes,
      service,
      tip,
      total,
      tableNumber,
      paid: false,
      status: "active", // opzionale se vuoi distinguere anche completato
    });

    return res.status(201).json(newOrder);
  } catch (err) {
    outError(res, err);
  }
};

/**
 * Recupera l'ordine attivo (non pagato) più recente di un utente
 */
const getActiveOrdersByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const order = await Order.findOne({ userId, paid: false })
      .sort({ createdAt: -1 })
      .lean();

    if (!order) {
      return res.status(404).json({ message: "Nessun ordine attivo" });
    }

    return res.status(200).json(order);
  } catch (err) {
    outError(res, err);
  }
};

/**
 * Recupera un ordine specifico tramite ID (usato da Payments.jsx)
 */
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).lean();

    if (!order) {
      return res.status(404).json({ message: "Ordine non trovato" });
    }

    return res.status(200).json(order);
  } catch (err) {
    outError(res, err);
  }
};

/**
 * Aggiorna lo stato di un singolo piatto da parte del ristoratore
 */
const updateItemStatus = async (req, res) => {
  const { orderId, itemId } = req.params;
  const { status } = req.body;

  const validStatus = ["preparing", "served"];
  if (!validStatus.includes(status)) {
    return res.status(400).json({ message: "Status non valido" });
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Ordine non trovato" });

    const item = order.items.id(itemId);
    if (!item) return res.status(404).json({ message: "Item non trovato" });

    item.status = status;
    await order.save();

    return res.status(200).json({ message: "Stato aggiornato con successo" });
  } catch (err) {
    outError(res, err);
  }
};

/**
 * Segna l’ordine come pagato (chiamata lato client alla fine del pagamento)
 */
const markOrderAsPaid = async (req, res) => {
  const { orderId } = req.params;
  const { tipAmount } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Ordine non trovato" });

    const updatedTip = Number(tipAmount) || 0;
    const newTotal = order.total + updatedTip;

    order.paid = true;
    order.status = "paid";
    order.tip = updatedTip;
    order.total = newTotal;

    await order.save();

    return res.status(200).json({ message: "Ordine aggiornato con successo", order });
  } catch (err) {
    outError(res, err);
  }
};

/**
 * Recupera tutti gli ordini per il ristoratore
 */
/**
 * Recupera tutti gli ordini per il ristoratore, con info utente
 */
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("userId", "first_name last_name")
      .lean();
    //console.log("ORDERS:", orders.map(o => o.userId));
    //console.log("ORDERS FULL:", orders);
    return res.status(200).json(orders);
  } catch (err) {
    outError(res, err);
  }
};

module.exports = {
  createOrderFromCart,
  getActiveOrdersByUser,
  updateItemStatus,
  markOrderAsPaid,
  getAllOrders,
  getOrderById,
};

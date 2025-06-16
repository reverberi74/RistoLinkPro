import { createSlice } from "@reduxjs/toolkit";
import { Memory } from "../../utilities/memory";

/**
 * Stato dell’ordine:
 * - "idle": Nessun ordine in corso (stato iniziale o dopo reset/pagamento)
 * - "preparing": L’ordine è stato inviato e i piatti sono in preparazione
 * - "served": L’ordine è stato completato e tutti i piatti sono stati serviti
 */

/**
 * Stato iniziale dell'ordine.
 * Recupera da memoria persistente o imposta stato di default.
 * @typedef {Object} OrderState
 * @property {Array<Object>} items - Elenco dei piatti ordinati.
 * @property {"idle" | "preparing" | "served"} status - Stato generale dell'ordine.
 * @type {OrderState}
 */
const initialState = Memory.get("order") || {
  items: [],
  status: "idle",
};

/**
 * Slice Redux per la gestione dell’ordine dell’utente.
 */
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    /**
     * Inizializza un nuovo ordine copiando i piatti dal carrello.
     * Ogni piatto assume lo stato "preparing".
     * @param {OrderState} state
     * @param {{ payload: Array<Object> }} action
     */
    setOrder: (state, { payload }) => {
      state.items = payload.map(item => ({
        ...item,
        status: "preparing",
      }));
      state.status = "preparing";
      Memory.set("order", state);
    },

    /**
     * Aggiorna lo stato di un singolo piatto (es. da preparing a served).
     * @param {OrderState} state
     * @param {{ payload: { _id: string, status: "preparing" | "served" } }} action
     */
    updateOrderItemStatus: (state, { payload }) => {
      const { _id, status } = payload;
      const item = state.items.find(i => i._id === _id);
      if (item) item.status = status;
      Memory.set("order", state);
    },

    /**
     * Aggiorna lo stato generale dell’intero ordine.
     * @param {OrderState} state
     * @param {{ payload: "idle" | "preparing" | "served" }} action
     */
    updateOrderStatus: (state, { payload }) => {
      state.status = payload;
      Memory.set("order", state);
    },

    /**
     * Svuota l’ordine, utile dopo pagamento o reset.
     * @param {OrderState} state
     */
    clearOrder: (state) => {
      state.items = [];
      state.status = "idle";
      Memory.set("order", state);
    },
  }
});

export const {
  setOrder,
  updateOrderItemStatus,
  updateOrderStatus,
  clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;

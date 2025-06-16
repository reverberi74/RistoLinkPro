import { createSlice } from "@reduxjs/toolkit";
import { Memory } from "../../utilities/memory";

// Stato iniziale: recupera il carrello salvato su localStorage (se presente), altrimenti imposta valori iniziali
const initialState = Memory.get("cart") || {
  items: [],             // Lista dei prodotti nel carrello
  totalPrice: 0,         // Prezzo totale del carrello
  totalQuantity: 0,      // Quantità totale di prodotti
  isOpen: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCartStatus: (state, { payload }) => {
      state.isOpen = payload;
    },

    /**
     * Aggiunge un prodotto al carrello.
     * Se il prodotto è già presente, ne incrementa la quantità.
     * Aggiorna anche il totale e salva su localStorage.
     */
    addToCart: (state, { payload }) => {
      // Verifica se il prodotto è già presente nel carrello
      const existingItem = state.items.find(item => item._id === payload._id);

      // Determina la quantità da aggiungere (default 1) e il prezzo
      const quantityToAdd = Number(payload.quantity) || 1;
      const price = Number(payload.price) || 0;

      if (existingItem) {
        // Se già presente, incrementa solo la quantità
        existingItem.quantity += quantityToAdd;
      } else {
        // Altrimenti, aggiunge il nuovo prodotto con la quantità e prezzo
        state.items.push({ ...payload, quantity: quantityToAdd, price });
      }

      // Aggiorna totali generali
      state.totalQuantity += quantityToAdd;
      state.totalPrice += price * quantityToAdd;

      // Salva il nuovo stato del carrello su localStorage
      Memory.set("cart", state);
    },

    /**
     * Diminuisce la quantità di un prodotto nel carrello.
     * Se la quantità arriva a zero, lo rimuove.
     */
    decreaseFromCart: (state, { payload }) => {
      const existingItem = state.items.find(item => item._id === payload._id);

      if (existingItem) {
        // Diminuisce la quantità di 1
        existingItem.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= existingItem.price;

        // Se la quantità è zero, rimuove l'articolo dal carrello
        if (existingItem.quantity === 0) {
          state.items = state.items.filter(item => item._id !== payload._id);
        }

        // Salva lo stato aggiornato
        Memory.set("cart", state);
      }
    },

    /**
     * Imposta manualmente una nuova quantità per un prodotto.
     * Se la quantità è zero, lo rimuove.
     */
    updateQuantity: (state, { payload }) => {
      const { _id, quantity } = payload;
      const existingItem = state.items.find(item => item._id === _id);

      if (existingItem) {
        // Calcola la differenza rispetto alla quantità attuale
        const diff = quantity - existingItem.quantity;

        // Aggiorna la quantità del prodotto
        existingItem.quantity = quantity;

        // Aggiorna i totali generali
        state.totalQuantity += diff;
        state.totalPrice += diff * existingItem.price;

        // Se la nuova quantità è zero, rimuove il prodotto
        if (quantity === 0) {
          state.items = state.items.filter(item => item._id !== _id);
        }

        // Salva lo stato aggiornato
        Memory.set("cart", state);
      }
    },

    /**
     * Rimuove completamente un prodotto dal carrello.
     */
    removeFromCart: (state, { payload }) => {
      const existingItem = state.items.find(item => item._id === payload._id);

      if (existingItem) {
        // Aggiorna i totali generali
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;

        // Rimuove l'articolo dalla lista
        state.items = state.items.filter(item => item._id !== payload._id);

        // Salva lo stato aggiornato
        Memory.set("cart", state);
      }
    },

    /**
     * Svuota completamente il carrello, azzerando prodotti e totali.
     */
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;

      // Salva lo stato svuotato
      Memory.set("cart", state);
    },
  }
});

// Esportazione delle singole azioni per usarle nei componenti React
export const {
  updateCartStatus,
  addToCart,
  decreaseFromCart,
  removeFromCart,
  clearCart,
  updateQuantity,
} = cartSlice.actions;

// Esportazione del reducer per collegarlo allo store Redux
export default cartSlice.reducer;

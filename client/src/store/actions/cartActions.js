import { api } from "../../utilities/apiStandalone";
import {
  addToCart,
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../slices/cartSlice";

/**
 * Carica il carrello per l'utente loggato
 */
export const fetchCart = () => async (dispatch, getState) => {
  try {
    const userId = getState().auth.user._id;
    const token = getState().auth.token;

    const response = await api.get(`/cart/${userId}`, token);
    dispatch(clearCart());

    console.log("Carrello ricevuto dal server:", response);

    response.forEach((item) => {
      dispatch(addToCart(item));
    });
  } catch (err) {
    console.error("Errore nel caricamento del carrello:", err);
  }
};

/**
 * Aggiunge un prodotto al carrello sul server
 */
export const addToCartDB = (product) => async (dispatch, getState) => {
  try {
    const state = getState();
    const token = state.auth.token;
    const userId = state.auth.user._id;

    const productWithUser = {
      ...product,
      productId: product._id, // 🔴 richiesto dal backend
      userId,
    };

    await api.post("/cart", productWithUser, token);
    dispatch(addToCart(product));
  } catch (err) {
    console.error("Errore durante l'aggiunta al carrello:", err);
  }
};

/**
 * Aggiorna la quantità di un prodotto nel carrello sul server
 */
export const updateQuantityDB = (_id, quantity) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;

    await api.put(`/cart/${_id}`, { quantity }, token);
    dispatch(updateQuantity({ _id, quantity }));
  } catch (err) {
    console.error("Errore durante l'aggiornamento della quantità:", err);
  }
};

/**
 * Rimuove un prodotto dal carrello sul server
 */
export const removeFromCartDB = (productId) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;

    await api.del(`/cart/${productId}`, token);
    dispatch(removeFromCart({ _id: productId }));
  } catch (err) {
    console.error("Errore durante la rimozione dal carrello:", err);
  }
};

/**
 * Svuota il carrello lato server e Redux
 */
export const clearCartDB = () => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    const userId = getState().auth.user._id;

    await api.del(`/cart/user/${userId}`, token); // ✅ route corretta
    dispatch(clearCart());
  } catch (err) {
    console.error("Errore nello svuotamento del carrello:", err);
  }
};

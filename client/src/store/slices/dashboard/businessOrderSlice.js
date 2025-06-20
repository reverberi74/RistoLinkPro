// src/store/slices/dashboard/orderSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../utilities/apiStandalone"; // ✅ Assicurati del path corretto

export const getAllOrders = createAsyncThunk(
  "dashboardOrders/getAllOrders",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth?.token;
      const response = await api.get("/orders/all", token);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Errore nel caricamento degli ordini"
      );
    }
  }
);

const businessOrderSlice = createSlice({
  name: "dashboardOrders",
  initialState: {
    orders: [],
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    updateOrderItemStatus: (state, action) => {
      const { orderId, itemId, status } = action.payload;
      const orderIndex = state.orders.findIndex((o) => o._id === orderId);
      if (orderIndex !== -1) {
        const itemIndex = state.orders[orderIndex].items.findIndex((i) => i._id === itemId);
        if (itemIndex !== -1) {
          // ❗ nuova istanza dell'array items per garantire immutabilità
          const updatedItems = [...state.orders[orderIndex].items];
          updatedItems[itemIndex] = {
            ...updatedItems[itemIndex],
            status,
          };
          state.orders[orderIndex].items = updatedItems;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      // 👇 Aggiungiamo un controllo e destrutturiamo se serve
      //console.log("💾 ORDINI SALVATI NELLO SLICE:", action.payload);
      if (Array.isArray(action.payload)) {
        state.orders = action.payload;
      } else if (action.payload?.data) {
        state.orders = action.payload.data;
      } else {
        console.warn("Formato dati inatteso:", action.payload);
        state.orders = [];
      }
    });
  },
});

export const { setOrders, updateOrderItemStatus } = businessOrderSlice.actions;
export default businessOrderSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axiosInstance";

// ✅ Thunk per recuperare l'ordine attivo (senza usare getState)
const fetchActiveOrder = createAsyncThunk(
  "order/fetchActiveOrder",
  async ({ userId, token }, thunkAPI) => {
    try {
      const res = await axios.get(`/orders/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data || null;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Thunk per segnare l'ordine come pagato
const markOrderAsPaid = createAsyncThunk(
  "order/markOrderAsPaid",
  async ({ orderId, token }, thunkAPI) => {
    try {
      const res = await axios.put(`/orders/${orderId}/paid`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Stato iniziale
const initialState = {
  items: [],
  status: "idle", // idle | preparing | served
  subtotal: 0,
  taxes: 0,
  service: 0,
  total: 0,
  loading: false,
  error: null,
};

// Slice ordine
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.items = [];
      state.status = "idle";
      state.subtotal = 0;
      state.taxes = 0;
      state.service = 0;
      state.total = 0;
      state.error = null;
    },
    updateOrderItemStatus: (state, { payload }) => {
      const { _id, status } = payload;
      const item = state.items.find((i) => i._id === _id);
      if (item) item.status = status;
    },
    updateOrderStatus: (state, { payload }) => {
      state.status = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveOrder.fulfilled, (state, { payload }) => {
        if (!payload) {
          state.status = "idle";
          state.items = [];
          return;
        }
        state.items = payload.items || [];
        state.status = inferOrderStatus(payload.items || []);
        state.subtotal = payload.subtotal || 0;
        state.taxes = payload.taxes || 0;
        state.service = payload.service || 0;
        state.total = payload.total || 0;
        state.loading = false;
      })
      .addCase(fetchActiveOrder.rejected, (state, { payload }) => {
        state.error = payload || "Errore nel caricamento dell’ordine.";
        state.loading = false;
      })
      .addCase(markOrderAsPaid.fulfilled, (state) => {
        state.status = "served";
        state.items = [];
        state.subtotal = 0;
        state.taxes = 0;
        state.service = 0;
        state.total = 0;
      })
      .addCase(markOrderAsPaid.rejected, (state, { payload }) => {
        state.error = payload || "Errore nel pagamento.";
      });
  },
});

// Funzione di supporto
const inferOrderStatus = (items) => {
  if (items.length === 0) return "idle";
  return items.every((item) => item.status === "served") ? "served" : "preparing";
};

// Export actions
export const {
  clearOrder,
  updateOrderItemStatus,
  updateOrderStatus,
} = orderSlice.actions;

// Export thunk + reducer
export { fetchActiveOrder, markOrderAsPaid };
export default orderSlice.reducer;

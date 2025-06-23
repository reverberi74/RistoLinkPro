import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk per ottenere tutti gli ordini (tavoli)
export const fetchTablesFromOrders = createAsyncThunk(
  "tables/fetchTablesFromOrders",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const res = await axios.get("/api/orders/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const orders = res.data;

      const tables = orders.map((order) => {
        const {
          _id: orderId,
          tableNumber,
          createdAt,
          paid,
          subtotal = 0,
          service = 0,
          taxes = 0,
          tip = 0,
          total = 0,
          items = [],
        } = order;

        const time = new Date(createdAt).toLocaleTimeString("it-IT", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return {
          orderId,
          tableNumber,
          time,
          status: paid ? "Pagato" : "Aperto",
          tip: tip > 0 ? tip.toFixed(2).replace(".", ",") + " €" : "-",
          total: total.toFixed(2).replace(".", ",") + " €",
          subtotal: subtotal.toFixed(2).replace(".", ",") + " €",
          service: service.toFixed(2).replace(".", ",") + " €",
          items: items.map((item) => ({
            name: item.name + (item.quantity > 1 ? ` (x ${item.quantity})` : ""),
            price: (item.price * item.quantity).toFixed(2).replace(".", ",") + " €",
          })),
        };
      });

      return tables;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const tableSlice = createSlice({
  name: 'tables',
  initialState: {
    tables: [],
    loading: false,
    error: null,
  },
  reducers: {
    // DISATTIVATO: lo stato dei tavoli ora viene gestito dal backend
    // toggleTableStatus(state, action) {
    //   const id = action.payload;
    //   const table = state.tables.find((t) => t.id === id);
    //   if (table) {
    //     table.status = table.status === "Pagato" ? "Aperto" : "Pagato";
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTablesFromOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTablesFromOrders.fulfilled, (state, action) => {
        state.tables = action.payload;
        state.loading = false;
      })
      .addCase(fetchTablesFromOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Errore nel caricamento dei tavoli.";
      });
  },
});

export default tableSlice.reducer;

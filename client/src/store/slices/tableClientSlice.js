import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tableNumber: null,             // es: 5
  tableNotification: null,       // es: "Tavolo 5 selezionato"
};

const tableClientSlice = createSlice({
  name: "tableClient",
  initialState,
  reducers: {
    setTableNumber: (state, action) => {
      state.tableNumber = parseInt(action.payload);
    },
    setTableNotification: (state, action) => {
      state.tableNotification = action.payload;
    },
    clearTableInfo: (state) => {
      state.tableNumber = null;
      state.tableNotification = null;
    },
  },
});

export const {
  setTableNumber,
  setTableNotification,
  clearTableInfo,
} = tableClientSlice.actions;

export default tableClientSlice.reducer;

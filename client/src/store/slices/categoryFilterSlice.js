import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: 'Tutti',
};

const categoryFilterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = categoryFilterSlice.actions;
export default categoryFilterSlice.reducer;
//REviews
import { createSlice } from "@reduxjs/toolkit";

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    all: [],
  },
  reducers: {
    setReviews: (state, { payload }) => {
      state.all = payload;
    },
  },
});

export const { setReviews } = reviewsSlice.actions;

export default reviewsSlice.reducer;

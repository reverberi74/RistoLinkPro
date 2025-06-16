import { createSlice } from '@reduxjs/toolkit';

const sortSlice = createSlice({
  name: 'sort',
  initialState: {
    sortBy: 'name-asc',
  },
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setSortBy } = sortSlice.actions;
export const selectSortBy = (state) => state.sort.sortBy;
export default sortSlice.reducer;
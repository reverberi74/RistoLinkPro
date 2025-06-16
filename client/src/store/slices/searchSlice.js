import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        categories: [],
        products: [],
    },
    reducers: {
        setSearchResult: (state, { payload }) => {
            state.categories = payload.categories;
            state.products = payload.products;
        },
        clearSearchResult: (state) => {
            state.categories = [];
            state.products = [];
        },
    },
});

export const { setSearchResult, clearSearchResult } = searchSlice.actions;

export default searchSlice.reducer;
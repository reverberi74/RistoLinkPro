import { createSlice } from "@reduxjs/toolkit";


const categorySlice = createSlice({
    
    name: "category",
    initialState: {
        all: [],
        current: null,
    },
    reducers: {
        setCategories: (state, { payload }) => {
            state.all = payload;
        },
        setCurrentCategory: (state, { payload }) => {
            state.current = payload;
        },
    },
});

export const { setCategories, setCurrentCategory } = categorySlice.actions;

export default categorySlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const sortingMethod = (mode) => (a, b) => {
    switch(mode) {
        case "NAME_ASC":
            return a.name.localeCompare(b.name);
        case "NAME_DESC":
            return b.name.localeCompare(a.name);
        case "PRICE_ASC":
            return a.price - b.price;
        case "PRICE_DESC":
            return b.price - a.price;
        default:
            return a.name.localeCompare(b.name);
    }
}

const productSlice = createSlice({
    name: "products",
    initialState: {
        all: [],
        current: null,
    },
    reducers: {
        setProducts: (state, { payload }) => {
            state.all = payload.sort(sortingMethod());
        },
        setCurrentProduct: (state, { payload }) => {
            state.current = payload;
        },
        sortBusinessMenuProducts: (state, { payload }) => {
            state.all = [...state.all].sort(sortingMethod(payload));
        }
    },
});

export const { setProducts, setCurrentProduct, sortBusinessMenuProducts } = productSlice.actions;

export default productSlice.reducer;
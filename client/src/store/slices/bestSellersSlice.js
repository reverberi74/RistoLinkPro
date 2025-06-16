import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bruschetta from '../../../../server/assets/bruschetta-pomodoro.webp';
import tartare from '../../../../server/assets/tartare.webp';
import polenta from '../../../../server/assets/polentina-funghi-lardo.png';

export const fetchBestSellers = createAsyncThunk(
    'bestSellers/fetchBestSellers',
    async (__, thunkAPI) => {
        try {
            /* const response = await fetch('/api/best-sellers');
            if(!response.ok) throw new Error("Errore nel caricamento");
            const data = await response.json(); */
            const data = [
                { id: 1, name: "Tartare di manzo in stile orientale", image: bruschetta, orders: 89, price: 9.80 },
                { id: 2, name: "Bruschetta al tartufo nero", image: tartare, orders: 71, price: 12.30 },
                { id: 3, name: "Polentina con funghi porcini e lardo", image: polenta, orders: 65, price: 7.20 },
                { id: 4, name: "Polentina con funghi porcini e lardo", image: polenta, orders: 65, price: 7.20 },
                { id: 5, name: "Polentina con funghi porcini e lardo", image: bruschetta, orders: 65, price: 7.20 },
                { id: 6, name: "Polentina con funghi porcini e lardo", image: tartare, orders: 65, price: 7.20 },
            ];
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const bestSellersSlice = createSlice({
    name: 'bestSellers',
    initialState: {
        items: [],
        status: 'idle', // idle | loading | succeeded | failed
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBestSellers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchBestSellers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload; // i 5 migliori piatti
            })
            .addCase(fetchBestSellers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    },
});

export default bestSellersSlice.reducer;
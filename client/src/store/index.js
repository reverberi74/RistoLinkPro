import { configureStore } from "@reduxjs/toolkit";

// Import API standalone per i thunk
import { api } from "../utilities/apiStandalone";

// Slices principali
import authSlice from "./slices/authSlice";
import categorySlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";
import searchSlice from "./slices/searchSlice";
import labelSlice from "./slices/labelSlice";
import cartSlice from "./slices/cartSlice";
import settingsSlice from "./slices/settingsSlice";
import filtersReducer from './slices/categoryFilterSlice';
import orderSlice from "./slices/orderSlice";
import sortSlice from './slices/sortSlice'; // CORRETTO: questo è per gestire l'ordinamento

// Slices del dashboard business
import tableReducer from "./slices/dashboard/tableSlice";
import reviewsSlice from "./slices/dashboard/reviewsSlice";

// Best sellers
import bestSellersReducer from "./slices/bestSellersSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    categories: categorySlice,
    products: productSlice,
    search: searchSlice,
    labels: labelSlice,
    cart: cartSlice,
    order: orderSlice,
    settings: settingsSlice,
    filters: filtersReducer,
    sort: sortSlice,
    bestSellers: bestSellersReducer,
    tables: tableReducer,
    reviews: reviewsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { api }, // ✅ passaggio fondamentale
      },
      serializableCheck: false,
    }),
});

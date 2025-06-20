import { configureStore } from "@reduxjs/toolkit";
import { api } from "../utilities/apiStandalone"; // ✅ API standalone per i thunk

// Slices principali
import authSlice from "./slices/authSlice";
import categorySlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";
import searchSlice from "./slices/searchSlice";
import labelSlice from "./slices/labelSlice";
import cartSlice from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import settingsSlice from "./slices/settingsSlice";
import filtersReducer from "./slices/categoryFilterSlice";
import sortSlice from "./slices/sortSlice";
import bestSellersReducer from "./slices/bestSellersSlice";
import tableClientReducer from './slices/tableClientSlice';

// Slices dashboard business
import tableReducer from "./slices/dashboard/tableSlice";
import reviewsSlice from "./slices/dashboard/reviewsSlice";
import businessOrderReducer from "./slices/dashboard/businessOrderSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    categories: categorySlice,
    products: productSlice,
    search: searchSlice,
    labels: labelSlice,
    cart: cartSlice,
    order: orderReducer,
    tableClient: tableClientReducer,
    settings: settingsSlice,
    filters: filtersReducer,
    sort: sortSlice,
    bestSellers: bestSellersReducer,
    tables: tableReducer,
    reviews: reviewsSlice,
    dashboardOrders: businessOrderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { api },
      },
      serializableCheck: false,
    }),
});

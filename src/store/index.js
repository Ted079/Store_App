import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categories/categoriesSlice";
import productsReducer from "./products/productsSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware({
    //     serializableCheck: false, // Отключает проверку сериализуемости
    //   }),
  },
  devTools: true,
});

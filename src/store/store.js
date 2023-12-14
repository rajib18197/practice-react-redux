import { configureStore } from "@reduxjs/toolkit";
import booksApi from "../features/books/booksApi";
import booksReducer from "../features/books/booksSlice";

const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
    books: booksReducer,
  }, 

  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(booksApi.middleware),
});

export default store;

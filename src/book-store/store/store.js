import {
  createStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import booksReducer from "../features/books/booksSlice";

const rootReducers = combineReducers({
  books: booksReducer,
});

const store = createStore(rootReducers, applyMiddleware(thunk));
export default store;

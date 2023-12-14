import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "../features/blogs/blogsSlice";

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import diaryReducer from "../features/diary/diarySlice";
 
const store = configureStore({
  reducer: {
    diary: diaryReducer,
  },
});

export default store;
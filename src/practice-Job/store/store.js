import { configureStore } from "@reduxjs/toolkit";
import jobSliceReducer from "../features/job/jobSlice";

const store = configureStore({
  reducer: {
    job: jobSliceReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "../features/videos/videoSlice";
import filterSlice from "../features/videos/filterSlice";

export const store = configureStore({
    reducer: {
        videos: videoSlice,
        filters: filterSlice,
    },
}); 
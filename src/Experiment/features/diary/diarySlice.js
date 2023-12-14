import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  diaryName: "Programming",
  fontFamily: "Lato",
  fontSize: "large",
  width: "half",
};

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    updateDiaryName(state, action) {
      state.diaryName = action.payload;
    },

    updateFontFamily(state, action) {
      state.fontFamily = action.payload;
    },

    updateFontSize(state, action) {
      state.fontSize = action.payload;
    },

    updateWidth(state, action) {
      state.width = action.payload;
    },
  },
});

export const {
  updateDiaryName,
  updateFontFamily,
  updateFontSize,
  updateWidth,
} = diarySlice.actions;

export default diarySlice.reducer; 

export const selectDiarySlice = (state) => state.diary;
 
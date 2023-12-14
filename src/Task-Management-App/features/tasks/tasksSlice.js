import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const { addQuery } = tasksSlice.actions;
export default tasksSlice.reducer;

export const getTaskState = (state) => state.tasks;

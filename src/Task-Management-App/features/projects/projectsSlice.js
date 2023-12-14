import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterIds: [],
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addFilters(state, action) {
      state.filterIds.push(action.payload);
    },

    removeFilter(state, action) {
      state.filterIds = state.filterIds.filter((el) => el !== action.payload);
    },
  },
});

export const {addFilters, removeFilter} = projectsSlice.actions;
export default projectsSlice.reducer;

export const getProjectsState = (state) => state.projects;

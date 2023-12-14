import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterValue: "all",
  searchQuery: "",
  toast: {
    status: "",
    message: "",
  },
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setFilterValue(state, action) {
      state.filterValue = action.payload;
    },

    setSearchValue(state, action) {
      state.searchQuery = action.payload;
    },

    emptySearchValue(state) {
      state.searchQuery = "";
    },

    showToast(state, action) {
      state.toast.status = action.payload.status;
      state.toast.message = action.payload.message;
    },

    removeToast(state) {
      state.toast.status = "";
      state.toast.message = "";
    },
  },
});

export const {
  setFilterValue,
  setSearchValue,
  emptySearchValue,
  showToast,
  removeToast,
} = booksSlice.actions;

export default booksSlice.reducer;

export const getState = (state) => state.books;

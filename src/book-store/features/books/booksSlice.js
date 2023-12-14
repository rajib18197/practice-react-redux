import { actionTypes } from "./booksActionTypes";

const {
  LOADED,
  CREATED_NEW_BOOK,
  UPDATED_BOOK,
  DELETED_BOOK,
  UPDATE_BOOK,
  FILTER_BOOK,
  CHANGE_PAGE,
} = actionTypes;

const initialState = {
  books: [],
  updatingBook: {},
  filterValue: "all",
  currentPage: 1,
};

const booksReducer = function (state = initialState, action) {
  switch (action.type) {
    case LOADED:
      return { ...state, books: [...state.books, ...action.payload] };

    case CREATED_NEW_BOOK:
      return { ...state, books: [...state.books, action.payload] };

    case UPDATED_BOOK:
      return {
        ...state,
        updatingBook: {},
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload.book : book
        ),
      };

    case DELETED_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };

    case UPDATE_BOOK:
      return { ...state, updatingBook: action.payload };

    case FILTER_BOOK:
      return { ...state, filterValue: action.payload };

    case CHANGE_PAGE:
      return { ...state, currentPage: action.payload };

    default:
      return state;
  }
};

export default booksReducer;

export const getState = (state) => state.books;

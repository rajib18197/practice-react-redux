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

export const loadedBooks = function (books) {
  return {
    type: LOADED,
    payload: books,
  };
};

export const createdNewBook = function (newBook) {
  return {
    type: CREATED_NEW_BOOK,
    payload: newBook,
  };
};

export const updatedBook = function ({ id, book }) {
  return {
    type: UPDATED_BOOK,
    payload: { id, book },
  };
};

export const deleteBook = function (id) {
  return { type: DELETED_BOOK, payload: id };
};

export const updateBook = function (book) {
  return {
    type: UPDATE_BOOK,
    payload: book,
  };
};

export const filterBook = function (value) {
  return {
    type: FILTER_BOOK,
    payload: value,
  };
};

export const changePage = function (page) {
  return {
    type: CHANGE_PAGE,
    payload: page,
  };
};

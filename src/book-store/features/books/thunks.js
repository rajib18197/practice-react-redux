import { updateBook, createNewBook, getBooks, deleteBook as removeBookApi } from "../../services/apiBooks";
import { createdNewBook, loadedBooks, updatedBook, deleteBook } from "./booksActions";

export async function fetchBooksThunk(dispatch) {
  try {
    const allBooks = await getBooks();
    dispatch(loadedBooks(allBooks));
  } catch (err) {
    console.error(err);
  }
}

export function createBookThunk(newBook) {
  return async function (dispatch) {
    try {
      const book = await createNewBook(newBook);
      dispatch(createdNewBook(book));
    } catch (err) {
      console.error(err);
    }
  };
}


export function updateBookThunk({id, bookToUpdate}){
  return async function(dispatch){
    const book = await updateBook({id, book: bookToUpdate});
    dispatch(updatedBook({id: book.id, book}))
  }
}


export function deleteBookThunk(id){
  return async function(dispatch){
    const data = await removeBookApi(id);
    dispatch(deleteBook(id))
  }
}
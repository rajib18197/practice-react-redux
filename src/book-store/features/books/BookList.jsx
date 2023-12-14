import { useDispatch, useSelector } from "react-redux";
import BookItem from "./BookItem";
import { getState } from "./booksSlice";
import { useEffect } from "react";
import { fetchBooksThunk } from "./thunks";
import Pagination from "../../ui/Pagination";

const MAX_SIZE_PER_PAGE = 2;

export default function BookList() {
  const { books, filterValue, currentPage } = useSelector(getState);
  const dispatch = useDispatch();

  let filteredBooks;
  if (filterValue === "all") filteredBooks = books;
  if (filterValue === "with-featured")
    filteredBooks = books.filter((book) => book.featured);
  if (filterValue === "without-featured")
    filteredBooks = books.filter((book) => !book.featured);

  const currentPageBooks = filteredBooks.slice(
    (currentPage - 1) * MAX_SIZE_PER_PAGE,
    currentPage * MAX_SIZE_PER_PAGE
  );

  useEffect(
    function () {
      dispatch(fetchBooksThunk);
    },
    [dispatch]
  );

  return (
    <>
      <div className="lws-bookContainer">
        {currentPageBooks.map((book) => (
          <BookItem book={book} key={book.id} />
        ))}
      </div>
      <Pagination count={filteredBooks.length} />
    </>
  );
}

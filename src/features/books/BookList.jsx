import { useSelector } from "react-redux";
import BookItem from "./BookItem";
import { useGetBooksQuery } from "./booksApi";
import { getState } from "./booksSlice";

export default function BookList() {
  // const data = useGetBooksQuery(); // [for experimenting]

  // So, First time component Mount and the data has comes and everything is going well as expected. From that time onwards this [refetchOnMountOrArgChange] property's time will start counting and If that time has elapsed then no additional request will made as we still in the component but if we go to another route then immediately (or before less than 15 seconds) come back to this component then new additional request will be made.

  // so we might think that If we go back to another route then time will start counting just like it happens in the [keepUnusedDataFor] property. But that is not the case for [refetchOnMountOrArgChange] property. It is similar to [staleTime] in react query.

  // Another Difference is that in react query [staleTime] is configured by default but in rtk query [refetchOnMountOrArgChange] is false by default.
  // React Query set some quite aggresive (but necessary for most of the time) defaults which Rtk query does not.

  // undefined, {
  //   refetchOnMountOrArgChange: 15,
  // }

  // Other Note on React:
  // Data flow is the backbone of any application, dictating how information moves and transforms as it navigates through your code. This means that data has one, and only one, way to be transferred to other parts of the application.
  const { data: books, isLoading, isError, error } = useGetBooksQuery();
  const { filterValue, searchQuery } = useSelector(getState);

  // 1) Filter Books
  let filteredBooks;
  if (filterValue === "all") filteredBooks = books;

  if (filterValue === "featured")
    filteredBooks = books.filter((book) => book.featured);

  console.log(filteredBooks, filterValue);
  // 2) Filter books with searched keywords
  const searchedBooks =
    filteredBooks?.filter((book) =>
      book.name.toLowerCase().includes(searchQuery)
    ) ?? [];

  return (
    <div className="space-y-6 md:space-y-0 md:grid grid-cols-1 lg:grid-cols-3 gap-6">
      {isLoading && <h2>Loading</h2>}
      {!isLoading && isError && <h2>{error}</h2>}
      {!isLoading && !isError && searchedBooks.length === 0 && (
        <h2>No books found</h2>
      )}
      {!isLoading &&
        !isError &&
        searchedBooks.length > 0 &&
        searchedBooks.map((book) => <BookItem key={book.id} book={book} />)}
    </div>
  );
}

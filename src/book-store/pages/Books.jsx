import BookForm from "../features/books/BookForm";
import BookList from "../features/books/BookList";
import BookOpeartions from "../features/books/BookOperations";
import Main from "../ui/Main";

export default function Books() {
  return (
    <Main>
      <div className="order-2 xl:-order-1">
        <BookOpeartions />
        <BookList />
      </div>

      <BookForm />
    </Main>
  );
}

import BookList from "../features/books/BookList";
import BookListOperations from "../features/books/BookListOperations";
import Heading from "../ui/Heading";
 
export default function Books() {
  return (
    <main className="py-12 px-6 2xl:px-6 container">
      <div className="order-2 xl:-order-1">
        <div className="flex items-center justify-between mb-12">
          <Heading className="mt-2 text-xl font-bold" as="h4">Book List</Heading>

          <BookListOperations />
        </div>

        <BookList />
      </div>
    </main>
  );
}

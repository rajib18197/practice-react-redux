import { useParams } from "react-router-dom";
import Form from "../ui/Form";
import Heading from "../ui/Heading";
import Main from "../ui/Main";
import { useGetBookQuery } from "../features/books/booksApi";

export default function UpdateBook() {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useGetBookQuery(id);

  return (
    <Main>
      {isLoading && <h2>Loading</h2>}
      {!isLoading && isError && <h2>Error</h2>}
      {!isLoading && !isError && !book?.id && (
        <h2>Book Not Found. Please try again!</h2>
      )}
      {!isLoading && !isError && book?.id && (
        <>
          <Heading className={"mb-8 text-xl font-bold text-center"} as="h4">
            Update Book
          </Heading>
          <Form bookToUpdate={book} />
        </>
      )}
    </Main>
  );
}

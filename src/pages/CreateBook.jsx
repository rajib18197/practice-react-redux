import Form from "../ui/Form";
import Heading from "../ui/Heading";
import Main from "../ui/Main";

export default function CreateBook() {
  return (
    <Main>
      <Heading className="mb-8 text-xl font-bold text-center" as="h4">
        Add New Book
      </Heading>
      <Form />
    </Main>
  );
}

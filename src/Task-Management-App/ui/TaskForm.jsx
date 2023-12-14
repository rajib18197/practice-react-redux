import CreateUpdateForm from "../features/tasks/CreateUpdateForm";
import Heading from "./Heading";
import Main from "./Main";

export default function TaskForm({data}) {
  return (
    <>
      <Main>
        <Heading as="h1">Create Task for Your Team</Heading>
        <div class="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          <CreateUpdateForm taskToUpdate={data} />
        </div>
      </Main>
    </>
  );
}

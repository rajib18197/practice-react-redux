import CreateUpdateForm from "../features/job/CreateUpdateForm";
import Main from "../ui/Main";

export default function CreateJob() {
  return (
    <Main>
      <h1 className="mb-10 text-center lws-section-title">Add New Job</h1>
      <CreateUpdateForm />
    </Main>
  );
}

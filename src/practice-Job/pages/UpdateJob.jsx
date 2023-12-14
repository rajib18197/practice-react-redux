import CreateUpdateForm from "../features/job/CreateUpdateForm";
import Main from "../ui/Main";

export default function UpdateJob() {
  return (
    <Main>
      <h1 className="mb-10 text-center lws-section-title">Edit Job</h1>
      <CreateUpdateForm />
    </Main>
  );
}

import JobOperation from "../features/job/JobOperation";
import JobTable from "../features/job/JobTable";
import Main from "../ui/Main";

export default function Jobs() {
  return (
    <Main>
      <div className="md:flex space-y-2 md:space-y-0 justify-between mb-10 ">
        <h1 className="lws-section-title">All Available Jobs</h1>
        <JobOperation />
      </div>

      <JobTable />
    </Main>
  );
}

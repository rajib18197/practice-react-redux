import { useDispatch, useSelector } from "react-redux";
import JobRow from "./JobRow";
import { fetchAllJobs, selectJobsState } from "./jobSlice";
import { useEffect } from "react";

export default function JobTable() {
  const { results, isLoading, isError } = useSelector(selectJobsState);
  const dispatch = useDispatch();

  useEffect(function () {
    dispatch(fetchAllJobs());
  }, [dispatch]);

  if(isLoading && !isError) return <h2>Loading</h2>
  if(!isLoading && isError) return <h2>Error</h2>
  if(!isLoading && !isError && results.length === 0) return <h2>No Jobs Found</h2>

  return (
    <div className="jobs-list">
      {results.map(res => <JobRow key={res.id} job={res}/>)}
    </div>
  );
}

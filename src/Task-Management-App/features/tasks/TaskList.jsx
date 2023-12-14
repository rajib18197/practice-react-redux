import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import { useGetTasksQuery } from "./tasksApi";
import { getProjectsState } from "../projects/projectsSlice";
import { getTaskState } from "./tasksSlice";

export default function TaskList() {
  const { filterIds } = useSelector(getProjectsState);
  const { searchQuery: query } = useSelector(getTaskState);
  // console.log(filterIds);
  const {
    data: tasks,
    isLoading,
    isError,
  } = useGetTasksQuery({ filterIds, query });
  console.log(tasks);
  return (
    <div class="lws-task-list">
      {isLoading && <p>Loading</p>}
      {!isLoading && isError && (
        <p>Error occured while fetching tasks. Please try again!</p>
      )}
      {!isLoading && !isError && tasks.length === 0 && <h2>No tasks found.</h2>}
      {!isLoading &&
        !isError &&
        tasks.length > 0 &&
        tasks.map((task) => <TaskItem key={task.id} task={task} />)}
    </div>
  );
}

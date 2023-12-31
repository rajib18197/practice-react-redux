import { useNavigate } from "react-router-dom";
import Select from "../../ui/Select";
import { useDeleteTaskMutation, useStatusChangeMutation } from "./tasksApi";
import { useEffect } from "react";

export default function TaskItem({ task }) {
  // console.log(isLoading);
  const {
    id,
    taskName,
    teamMember: { id: teamMemberId, name, avatar },
    project: { id: projectId, projectName, colorClass },
    deadline,
    status,
  } = task;

  const navigate = useNavigate();

  const [statusChange, { data: changedData, isLoading: isUpdating, isError }] =
    useStatusChangeMutation();
  const [deleteTask, { data, isLoading: isDeleting, isError: isDeleteError }] =
    useDeleteTaskMutation();

  console.log(changedData, changedData?.status);

  function handleChange(e) {
    statusChange({ id, data: { ...task, status: e.target.value } });
  }

  function handleDelete() {
    deleteTask(id);
  }

  return (
    <div class="lws-task">
      <div class="flex items-center gap-2 text-slate">
        <h2 class="lws-date">{deadline}</h2>
        <h4 class="lws-month">March</h4>
      </div>

      <div class="lws-taskContainer">
        <h1 class="lws-task-title">{taskName}</h1>
        <span class={`lws-task-badge ${colorClass}`}>{projectName}</span>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <img src={`/public${avatar}`} class="team-avater" />
          <p class="lws-task-assignedOn">{name}</p>
        </div>
        {(changedData?.status === "completed" || status === "completed") && (
          <button class="lws-delete" onClick={handleDelete}>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-gray-600 hover:text-red-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        )}
        {((changedData?.status !== "completed" && status !== "completed")) && (
          <button
            class="lws-edit"
            onClick={() => navigate(`/update-task/${id}`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-gray-600 hover:text-indigo-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
        )}
        <Select
          options={[
            { value: "pending", label: "Pending" },
            { value: "inProgress", label: "In Progress" },
            { value: "completed", label: "Completed" },
          ]}
          value={changedData?.status ? changedData.status : status}
          onChange={handleChange}
          isUpdating={isUpdating}
        />
      </div>
    </div>
  );
}

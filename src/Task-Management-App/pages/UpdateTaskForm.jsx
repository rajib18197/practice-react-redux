import { useParams } from "react-router-dom";
import TaskForm from "../ui/TaskForm";
import { useGetTaskQuery } from "../features/tasks/tasksApi";

export default function UpdateTaskForm(){
    const {id} = useParams();
    const {data = {}, isLoading} = useGetTaskQuery(id);
    console.log(data);
    return data.id && <TaskForm data={data}/>
}
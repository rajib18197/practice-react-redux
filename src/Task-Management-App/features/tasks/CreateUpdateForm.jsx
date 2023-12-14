import { useEffect, useState } from "react";
import Select from "../../ui/Select";
import { useGetProjectsQuery } from "../projects/projectsApi";
import { useGetTeamsQuery } from '../teams/teamsApi';
import { useAddTaskMutation, useUpdateTaskMutation } from "./tasksApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateUpdateForm({taskToUpdate = {}}) {
  const isUpdateSession = Boolean(taskToUpdate.id);
  const {id: updateId, taskName: initialTaskName, teamMember: initialTeam, teamMember: {name: initialAssignTo} = {}, project: initialProject, project: {projectName: initialProjectName} = {}, deadline: initialDeadline, status} = taskToUpdate;

  const {data: projects, isLoading: isProjectsLoading, isError: isProjectsError} = useGetProjectsQuery();
  const {data: teams, isLoading: isTeamsLoading, isError: isTeamsError} = useGetTeamsQuery();

  const projectOptions = projects?.map(project => ({value: project.projectName.split(' ').join('-').toLowerCase(), label: project.projectName.split(' ').map(n => n[0].toUpperCase() + n.slice(1)).join(' ')}))

  const teamOptions = teams?.map(team => ({value: team.name.split(' ').join('-').toLowerCase(), label: team.name.split(' ').map(n => n[0].toUpperCase() + n.slice(1)).join(' ')}))

  // console.log(projectOptions);
  // console.log(teamOptions);

  const [addTask, {data: newTask, isLoading: isNewTaskLoading}] = useAddTaskMutation();
  const [updateTask, {data: updatedTask, isLoading: isUpdating}] = useUpdateTaskMutation();
  // const {data: project} = useGetProjectQuery(undefined, {
  //   skip: 
  // });
  // const {data: team} = useGetTeamsQuery();

  const [taskName, setTaskName] = useState(initialTaskName || '');
  const [assignTo, setAssignTo] = useState(initialAssignTo?.split(' ').join('-').toLowerCase() || '');
  const [projectName, setProjectName] = useState(initialProjectName?.split(' ').join('-').toLowerCase() || '');
  const [deadline, setDeadline] = useState(initialDeadline || '');
  const [projectToAdd, setProjectToAdd] = useState(initialProject || {});
  const [teamToAdd, setTeamToAdd] = useState(initialTeam || {});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(function(){
    if(updatedTask?.id || newTask?.id){
      navigate('/')
    }
  }, [navigate, updatedTask?.id, newTask?.id])

  async function handleChangeProject(e){
    setProjectName(e.target.value);
    const pro = projects.find(p => p.projectName.toLowerCase() === e.target.value.split('-').join(' '));
    // const response = await dispatch(projectsApi.endpoints.getProject.initiate(e.target.value.split('-').join(' '))).unwrap();
    // console.log(response);
    // setProjectToAdd(response[0])
    setProjectToAdd(pro);

  }

  async function handleChangeTeam(e){
    setAssignTo(e.target.value);
    const team = teams.find(t => t.name.toLowerCase() === e.target.value.split('-').join(' '));
    // const response = await dispatch(teamsApi.endpoints.getTeam.initiate(e.target.value.split('-').join(' '))).unwrap();
    // console.log(response);
    // setTeamToAdd(response[0]);
    setTeamToAdd(team)
  }

  function handleSubmit(e){
    e.preventDefault();
    console.log(teamToAdd, projectToAdd);
    if(isUpdateSession){
      updateTask({id: updateId, data: {taskName, teamMember: teamToAdd, project: projectToAdd, deadline, status}})
      return;
    }
    addTask({taskName, teamMember: teamToAdd, project: projectToAdd, deadline, status: 'pending'});
  }
  
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="fieldContainer">
        <label htmlFor="lws-taskName">Task Name</label>
        <input
          type="text"
          name="taskName"
          id="lws-taskName"
          required
          placeholder="Implement RTK Query"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>

      <div className="fieldContainer">
        <label>Assign To</label>
        {!isTeamsLoading && <Select options={[{value: '', label: 'Assign to'},...teamOptions]} value={assignTo} onChange={handleChangeTeam}  name="teamMember" id="lws-teamMember" required />}
      </div>

      <div className="fieldContainer">
        <label htmlFor="lws-projectName">Project Name</label>
        {!isProjectsLoading &&  <Select options={[{value: '', label: 'Select Project'},...projectOptions]} value={projectName} onChange={handleChangeProject} id="lws-projectName" name="projectName" required/>}
      </div>

      <div className="fieldContainer">
        <label htmlFor="lws-deadline">Deadline</label>
        <input type="date" name="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} id="lws-deadline" required />
      </div>

      <div className="text-right">
        <button type="submit" className="lws-submit">
          {isUpdating ? 'updating' : 'Save'}
        </button>
      </div>
    </form>
  );
}

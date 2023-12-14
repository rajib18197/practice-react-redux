import ProjectItem from "./ProjectItem";
import { useGetProjectsQuery } from "./projectsApi";

export default function ProjectList() {
  const { data: projects, isLoading, isError } = useGetProjectsQuery();

  return (
    <div>
      <h3 class="text-xl font-bold">Projects</h3>
      <div class="mt-3 space-y-4">
        {isLoading && <p>Loading</p>}
        {!isLoading && isError && (
          <p>Error occured while fetching projects. Please try again!</p>
        )}
        {!isLoading && !isError && projects?.length === 0 && (
          <h2>No Projects to show at this moment.</h2>
        )}
        {!isLoading &&
          !isError &&
          projects.length > 0 &&
          projects.map((project) => (
            <ProjectItem key={project.id} project={project}/>
          ))}
      </div>
    </div>
  );
}

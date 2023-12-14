import ProjectList from "../features/projects/ProjectList";
import TeamList from "../features/teams/TeamList";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <ProjectList />
      <TeamList />
    </div>
  );
}

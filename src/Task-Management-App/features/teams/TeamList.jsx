import TeamMember from "./TeamMember";
import { useGetTeamsQuery } from "./teamsApi";

export default function TeamList() {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();

  return (
    <div class="mt-8">
      <h3 class="text-xl font-bold">Team Members</h3>
      <div class="mt-3 space-y-4">
        {isLoading && <p>Loading</p>}
        {!isLoading && isError && (
          <p>
            Error occured while fetching team members. Please try again later!
          </p>
        )}
        {!isLoading && !isError && teams.length === 0 && (
          <p>No team member found at this moment.</p>
        )}
        {!isLoading &&
          !isError &&
          teams.length > 0 &&
          teams.map((team) => <TeamMember key={team.id} member={team} />)}
      </div>
    </div>
  );
}

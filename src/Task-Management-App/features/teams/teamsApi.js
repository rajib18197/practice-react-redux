import apiSlice from "../apiServerState/apiSlice";

const teamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: () => `/team`,
    }),
    getTeam: builder.query({
      query: (name) => `/team?q=${name}`,
    }),
  }),
});

export const { useGetTeamsQuery, useGetTeamQuery } = teamsApi;
export default teamsApi;
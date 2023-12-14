import apiSlice from "../apiServerState/apiSlice";

const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => `/projects`,
    }),

    getProject: builder.query({
        query: (projectName) => `/projects?q=${projectName}`
    })
  }),
});
 

export const {useGetProjectsQuery, useGetProjectQuery} = projectsApi;
export default projectsApi;
import apiSlice from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoggedInUser: builder.query({
      query: (email) => {
        // if (!email) return;
        return `/users?email=${email}`;
      },
    }),
  }),
});

export const { useGetLoggedInUserQuery } = userApi;

export default userApi;

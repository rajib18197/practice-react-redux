import { useNavigate } from "react-router-dom";
import apiSlice from "../api/apiSlice";
import userApi from "./userApi";

const authenticationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // After the result has arrived, immediately control goes to the component function to re-render the component in which this query was called and after that component was executed then the following code snippet will run and finished his pendeing job.

          console.log(result);
          if (result.data?.accessToken && result.data?.user) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                accessToken: result.data.accessToken,
                user: result.data.user,
              })
            );
          }

          userApi.endpoints.getLoggedInUser(result.data.user.email)
        } catch (err) {
          const error = {
            status: err.error.status || err.error.name,
            message: err.error.data || err.error.error || err.error.message,
          };
          console.log(error);
          console.log(err);
          throw error;
        }
      },
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log(result, "login");
        //   const r = await result.meta.request.json();
        //   console.log(r);
        //   if (result.data?.accessToken && result.data?.user) {
        //     localStorage.setItem(
        //       "user",
        //       JSON.stringify({
        //         accessToken: result.data.accessToken,
        //         user: {...result.data.user, password: r.password},
        //       })
        //     );
        //   }

        //   userApi.endpoints.getLoggedInUser(result.data.user.email)
        } catch (err) {
          const error = {
            status: err.error.status || err.error.name,
            message: err.error.data || err.error.error || err.error.message,
          };
          throw error;
        }
      },
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authenticationApi;

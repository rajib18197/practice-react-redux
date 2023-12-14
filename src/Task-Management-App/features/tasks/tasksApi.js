import apiSlice from "../apiServerState/apiSlice";

const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: ({ filterIds, query }) => {
        console.log(filterIds);
        const queryStr = filterIds.map((id) => `project.id_ne=${id}`).join("&");
        console.log(queryStr);
        let url = '/tasks';
        if(query && queryStr.length === 0){
          url += `?taskName_like=${query}`
        }
        if(queryStr.length > 0 && !query){
          url += `?${queryStr}`
        }

        if(query && queryStr.length > 0){
          url += `?${queryStr}&taskName_like=${query}`
        }

        console.log(url);
        return url;
      },
      providesTags: ["tasks"],
    }),

    getTask: builder.query({
      query: (id) => `/tasks/${id}`,
    }),

    getTaskByName: builder.query({
      query: (name) => {
        return `/tasks?q=${name}`;
      },
    }),

    statusChange: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["tasks"],
    }),

    addTask: builder.mutation({
      query: (data) => ({
        url: `/tasks`,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const response = await queryFulfilled;
        console.log(response);
        dispatch(
          apiSlice.util.updateQueryData(
            "getTasks",
            { filterIds: [], query: '' },
            (drafts) => {
              drafts.push(response.data);
            }
          )
        );
      },
    }),

    updateTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const response = await queryFulfilled;
        console.log(response);
        dispatch(
          apiSlice.util.updateQueryData(
            "getTasks",
            { filterIds: [], query: '' },
            (drafts) => {
              return drafts.map((task) => {
                console.log(task.id, arg.id);
                return Number(task.id) === Number(arg.id)
                  ? { ...response.data }
                  : {...task};
              });
            }
          )
        );
      },
    }),


    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),

      onQueryStarted: async (arg, { queryFulfilled, getState, dispatch }) => {
        console.log(getState);
        // optimistic update then update the data on the server
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getTasks",
            { filterIds: [], query: '' },
            (draft) => {
              console.log(draft.data);
              const r = draft.filter((el) => Number(el.id) !== Number(arg));
              console.log(r);
              return r;
            }
          )
        );

        // console.log(patchResult);
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useGetTaskByNameQuery,
  useStatusChangeMutation,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;

// TODO: Search and redirect after add or edit --- Done

//--------------- need to work on date formating on TaskLists

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://task-management-05un.onrender.com',
    }),
    tagTypes: ['tasks'],
    endpoints: (builder) => ({})
});

export default apiSlice;
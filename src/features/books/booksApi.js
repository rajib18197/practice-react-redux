import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),

  tagTypes: ["books", 'book'],

  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["books"],
    //   keepUnusedDataFor: 10,
    }),

    getBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: (result, error, arg) => [
        {type: 'book', id: arg}
      ]
    }),

    addBook: builder.mutation({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["books"],
    }),

    updateBook: builder.mutation({
      query: ({ id, updatedBook }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: updatedBook,
      }),
      invalidatesTags: (result, error, arg) => [
        'books',
        {type: 'book', id: arg.id}
      ],
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;

export default booksApi;

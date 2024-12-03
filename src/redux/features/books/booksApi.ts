import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseURL from "../../../utils/baseURL";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseURL()}/api/books`,
  credentials: 'include',
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem('token')
    if(token) {
      Headers.set('Authorization', `Bearer ${token}`)
    }
    return Headers
  }
})

const booksApi = createApi({
  reducerPath: 'bookApi',
  baseQuery,
  tagTypes: ['Books'],
  endpoints: (builder) => ({
    fetchAllBooks: builder.query({
      query: () => '/',
      providesTags: ["Books"]
    }),
    fetchBookById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Books", id}]
    }),
    addBook: builder.mutation({
      query: (newBook) => ({
        url: '/create-book',
        method: 'POST',
        body: newBook
      }),
      invalidatesTags: ['Books'] // We add this tag to automatically refresh the data, which means fetching all the books again
    }),
    updateBook: builder.mutation({
      query: ({id, ...rest}) => ({
        url: `/edit/${id}`,
        method: 'PUT',
        body: rest,
        headers: {
          'Content-Type': 'application/json'
        }
      }),
      invalidatesTags: ['Books']
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books']
    })
  })
})

export const {useFetchAllBooksQuery, useAddBookMutation, useDeleteBookMutation, useFetchBookByIdQuery, useUpdateBookMutation} = booksApi
export default booksApi
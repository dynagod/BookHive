import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const  baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/books`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token =  localStorage.getItem('token');
        if(token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder) =>({
        fetchAllBooks: builder.query({
            query: () => "/",
            providesTags: ["Books"]
        }),
        fetchBookById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Books", id }],
        }),
        fetchBookBySearch: builder.query({
            query: (query) => `/search?q=${query}`,
            providesTags: (result, error, id) => [{ type: "Books", id }],
        }),
        addBook: builder.mutation({
            query: (newBook) => ({
                url: `/create-book`,
                method: "POST",
                body: newBook
            }),
            invalidatesTags: ["Books"]
        }),
        updateBook: builder.mutation({
            query: ({id, ...rest}) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Books"]
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Books"]
        })
    })
})

export const {useFetchAllBooksQuery, useFetchBookByIdQuery, useFetchBookBySearchQuery, useAddBookMutation, useUpdateBookMutation, useDeleteBookMutation} = booksApi;
export default booksApi;
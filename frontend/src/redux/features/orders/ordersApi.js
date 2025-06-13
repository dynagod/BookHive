import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const  baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token =  localStorage.getItem('token');
        if(token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
});

const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery,
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/",
        method: "POST",
        body: newOrder,
        credentials: 'include',
      }),
      invalidatesTags: ['Orders'],
    }),
    getOrderByEmail: builder.query({
      query: (email) => ({
        url: `/email/${email}`
      }),
      providesTags: ['Orders'],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/${orderId}`,
        method: "PUT",
        body: { status },
        credentials: 'include',
      }),
      invalidatesTags: ['Orders'],
    }),
    cancelOrder: builder.mutation({
      query: ({ orderId }) => ({
        url: `/cancel/${orderId}`,
        method: "PUT",
        credentials: 'include',
      }),
      invalidatesTags: ['Orders'],
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: '/get-all'
      }),
      providesTags: ['Orders'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByEmailQuery,
  useUpdateOrderStatusMutation,
  useCancelOrderMutation,
  useGetAllOrdersQuery,
} = ordersApi;

export default ordersApi;
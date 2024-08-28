import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:4001/auth/" }),
  endpoints: (builder) => ({
    // getTodos: builder.query({
    //   query: () => `todo/`,
    //   providesTags: (result, error, arg) =>
    //     result
    //       ? [
    //           ...result.map(({ id }) => ({ type: "Todos", id })),
    //           { type: "Todos", id: "LIST" },
    //         ]
    //       : [{ type: "Todos", id: "LIST" }],
    // }),
    sendCode: builder.mutation({
      query: (body) => ({
        url: `sendemailcode`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: `createuser`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    // setIvykdytaTodo: builder.mutation({
    //   query: (body) => ({
    //     url: `todo`,
    //     method: "PATCH",
    //     body,
    //   }),
    //   invalidatesTags: [{ type: "Todos", id: "LIST" }],
    // }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  //   useGetTodosQuery,
  useSendCodeMutation,
  useCreateUserMutation,
} = authApi;

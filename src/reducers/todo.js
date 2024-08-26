import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const todoApi = createApi({
  reducerPath: "todoApi",
  tagTypes: ["Todos"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4001/" }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => `todo/`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Todos", id })),
              { type: "Todos", id: "LIST" },
            ]
          : [{ type: "Todos", id: "LIST" }],
    }),
    addTodo: builder.mutation({
      query: (body) => ({
        url: `todo/`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todo`,
        method: "DELETE",
        body: { taskId: id },
      }),
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
    setIvykdytaTodo: builder.mutation({
      query: (body) => ({
        url: `todo`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useSetIvykdytaTodoMutation,
} = todoApi;

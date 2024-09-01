import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:4001/auth" }),
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => `/66cddeb05b52612bffcb21d2`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Auth", id })),
              { type: "Auth", id: "LIST" },
            ]
          : [{ type: "Auth", id: "LIST" }],
    }),
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
    changeAvatar: builder.mutation({
      query: (body) => ({
        url: `changeavatar`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserInfoQuery,
  useSendCodeMutation,
  useCreateUserMutation,
  useChangeAvatarMutation,
} = authApi;

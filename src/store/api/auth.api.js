import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUserApi: builder.mutation({
      query: (user) => ({
        body: user,
        url: "/users",
        method: "POST",
      }),
      transformResponse: (response) => {
        return response.user;
      },
      invalidatesTags: () => [
        {
          type: "User",
        },
      ],
    }),
  }),
});

export const { useCreateUserApiMutation } = authApi;

import { api } from "./api";

export const intakeapi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => "managing-users/",
      invalidatesTags: ["intake"],
    }),

    getAllLawyer: builder.query({
      query: () => "lawyers/list/",
      invalidatesTags: ["intake"],
    }),

    getAllClients: builder.query({
      query: (view) => `clients/?view=${view}`, // Pass status as a query parameter
      providesTags: ["intake"],
    }),

    createClient: builder.mutation({
      query: (body) => ({
        url: "clients/create/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["intake"],
    }),

    getClientById: builder.query({
      query: (id) => `clients/${id}/detail/`, // Use the dynamic ID here
      providesTags: ["intake"],
    }),

    updateClient: builder.mutation({
      query: (body) => ({
        url: `clients/${body.id}/update/`, // Use dynamic client ID
        method: "PATCH",
        body, // Send the body with the updated data
      }),
      invalidatesTags: ["intake"], // Invalidate cached clients data
    }),

    getStats: builder.query({
      query: () => `clients/stats/`, // Use the dynamic ID here
      providesTags: ["intake"],
    }),
  }),
});

export const {
  // Newly added hooks for dynamic dropdowns
  useGetAllUserQuery,
  useGetClientByIdQuery,
  useGetAllLawyerQuery,
  useGetAllClientsQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useGetStatsQuery,
} = intakeapi;

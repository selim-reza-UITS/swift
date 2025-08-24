import { api } from "./api";

export const caseapi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllHighRiskClients: builder.query({
      query: () => "high-risk-clients/",
      invalidatesTags: ["case"],
    }),

    getCaseStats: builder.query({
      query: () => "clients/statistics/",
      invalidatesTags: ["case"],
    }),

    getAllFlaggedClients: builder.query({
      query: () => "flagged-clients/",
      providesTags: ["case"],
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
  useGetAllHighRiskClientsQuery,
  useGetAllFlaggedClientsQuery,
  useGetCaseStatsQuery,
  useGetAllUserQuery,
  useGetClientByIdQuery,
  useGetAllLawyerQuery,
  useGetAllClientsQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useGetStatsQuery,
} = caseapi;

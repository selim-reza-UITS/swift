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
      invalidatesTags: ["case"],
    }),
    clientOptOut: builder.mutation({
      query: (id) => ({
        url: `/clients/${id}/opt-out/`,
        method: "POST",
      }),
      invalidatesTags: ["case"],
    }),

    getClientById: builder.query({
      query: (id) => `clients/${id}/detail/`, // Use the dynamic ID here
      providesTags: ["case"],
    }),

    updateClient: builder.mutation({
      query: (body) => ({
        url: `clients/${body.id}/update/`, // Use dynamic client ID
        method: "PATCH",
        body, // Send the body with the updated data
      }),
      invalidatesTags: ["case"], // Invalidate cached clients data
    }),

    getStats: builder.query({
      query: () => `clients/stats/`, // Use the dynamic ID here
      providesTags: ["case"],
    }),
    
    getFirmScores: builder.query({
      query: () => `chats/firm-scores/`, // Use the dynamic ID here
      providesTags: ["case"],
    }),

    getMicroInsights: builder.query({
      query: (id) => `chats/client/${id}/client-insights/`, // Use the dynamic ID here
      providesTags: ["case"],
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
  useGetFirmScoresQuery,
  useGetMicroInsightsQuery,
  useClientOptOutMutation,
} = caseapi;

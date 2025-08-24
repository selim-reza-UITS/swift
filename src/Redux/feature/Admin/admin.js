import { api } from "../../api/api";
import { use } from "react";

export const adminapi = api.injectEndpoints({
  endpoints: (builder) => ({
    createLawFirm: builder.mutation({
      query: (data) => ({
        url: "lawfirms/create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["LawFirm"],
    }),
    getAdminDashboard: builder.query({
      query: () => "clients/statistics/",

      method: "GET",
    }),
        getDashboard: builder.query({
      query: () => "firms-statistics/",

      method: "GET",
    }),
    getHighRisk: builder.query({
      query: () => "high-risk-clients/",

      method: "GET",
    }),
    getFlaggedClient: builder.query({
      query: () => "flagged-clients/",

      method: "GET",
    }),
    getFirmChart: builder.query({
      query: () => "chats/firm-scores/",

      method: "GET",
    }),
    getClient: builder.query({
      query: () => "clients/",

      method: "GET",
      providesTags: ["intake"],
    }),
       createFeedback: builder.mutation({
      query: (data) => ({
        url: "cores/feedback/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["LawFirm"],
    }),
  }),
});

export const {
  useCreateLawFirmMutation,
  useGetHighRiskQuery,
  useGetAdminDashboardQuery,
  useGetFlaggedClientQuery,
  useGetFirmChartQuery,
  useGetClientQuery,
  useGetDashboardQuery,
  useCreateFeedbackMutation,
  useGetLawFirmQuery,
} = adminapi;

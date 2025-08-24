import { api } from "../../api/api";
import { use } from 'react';

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
    getLawFirm: builder.query({
      query: () => "lawfirms/list/",

      method: "GET",
      providesTags: ["LawFirm"],
    }),
   


  }),
});

export const {
  useCreateLawFirmMutation,
  useGetHighRiskQuery,
  useGetAdminDashboardQuery,
  useGetFlaggedClientQuery,
  useGetFirmChartQuery,
  useGetLawFirmQuery,
  
} = adminapi;

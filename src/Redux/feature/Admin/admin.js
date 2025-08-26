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
    createUser: builder.mutation({
      query: (body) => ({
        url: "users/create/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["intake"], // optional if you want to refetch lawyer list
    }),
    createFeedback: builder.mutation({
      query: (data) => ({
        url: "cores/feedback/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["LawFirm"],
    }),
    getLawyer: builder.query({
      query: () => "lawyers/list/",

      method: "GET",
      providesTags: ["Lawyer"],
    }),
    createLawyer: builder.mutation({
      query: (body) => ({
        url: "lawyers/create/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Lawyer"],
    }),
    updateLawyer: builder.mutation({
      query: ({ id, body }) => ({
        url: `lawyers/${id}/update/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Lawyer"],
    }),
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `users/${id}/update/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `users/${id}/delete/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Users"], // optional: refetch users list
    }),
   deleteClient: builder.mutation({
      query: ({ id, body }) => ({
        url: `users/${id}/delete/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Users"], // optional: refetch users list
    }),
    deleteLawyer: builder.mutation({
      query: ({ id }) => ({
        url: `lawyers/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"], // optional: refetch users list
    }),
    optOutClient: builder.mutation({
      query: (id) => ({
        url: `clients/${id}/opt-out/`,
        method: "POST", 
      }),
      invalidatesTags: ["Client"],
    }),
       getClientById: builder.query({
      query: (id) => `clients/${id}/detail/`, // Use the dynamic ID here
      providesTags: ["intake"],
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
  useGetLawyerQuery,
  useCreateLawyerMutation,
  useCreateUserMutation,
  useUpdateLawyerMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useDeleteLawyerMutation,
  useDeleteClientMutation,
  useOptOutClientMutation,
  useGetClientByIdQuery,
} = adminapi;

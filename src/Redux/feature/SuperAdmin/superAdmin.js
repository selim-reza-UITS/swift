import { api } from "../../api/api";

export const superAdminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createLawFirm: builder.mutation({
      query: (data) => ({
        url: "lawfirms/create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["LawFirm"],
    }),
    getDashboard: builder.query({
      query: () => "firms/statistics/",

      method: "GET",
    }),
    getLawFirm: builder.query({
      query: () => "lawfirms/list/",

      method: "GET",
      providesTags: ["LawFirm"],
    }),
    updateLawFirmStatus: builder.mutation({
      query: ({ id, body }) => ({
        url: `lawfirms/${id}/status/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["LawFirm"],
    }),
    updateLawFirm: builder.mutation({
      query: ({ id, body }) => ({
        url: `/lawfirms/${id}/update/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["LawFirm"],
    }),
    deleteLawFirm: builder.mutation({
      query: (id) => ({
        url: `lawfirms/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["LawFirm"],
    }),
    updateBilling: builder.mutation({
      query: ({ firmId, body }) => ({
        url: `/subscriptions/firm/${firmId}/billing-update/`,
        method: "PATCH", // or PATCH depending on backend
        body,
      }),
      invalidatesTags: ["Billing"],
    }),
    getBillingByFirm: builder.query({
      query: (firmId) => `subscriptions/firm/${firmId}/billing/`,
      providesTags: (result, error, firmId) => [
        { type: "Billing", id: firmId },
      ],
    }),
  }),
});

export const {
  useCreateLawFirmMutation,
  useGetDashboardQuery,
  useGetLawFirmQuery,
  useUpdateLawFirmStatusMutation,
  useUpdateLawFirmMutation,
  useGetBillingByFirmQuery,
  useUpdateBillingMutation,
  useDeleteLawFirmMutation,
} = superAdminApi;

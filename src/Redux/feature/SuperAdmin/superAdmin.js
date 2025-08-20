import { api } from "../../api/api";

export const superAdminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createLawFirm: builder.mutation({
      query: (data) => ({
        url: "lawfirms/create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["LawFirm"], // optional: cache invalidate
    }),
    getDashboard: builder.query({
      query: () => "firms/statistics/",

      method: "GET",
    }),
  }),
});

export const { useCreateLawFirmMutation, useGetDashboardQuery } = superAdminApi;

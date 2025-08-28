import { api } from "../../api/api";
import { use } from 'react';

export const shareapi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "profile/",

      method: "GET",
    }),

    updateName: builder.mutation({
      query: ({ body }) => ({
        url: `profile/update/`,
        method: "PATCH",
        body,
      }),
    }),
    changePassword: builder.mutation({
      query: ({ old_password, new_password }) => ({
        url: "auth/change-password/",
        method: "POST",
        body: { old_password, new_password },
      }),
    }),
     updateNotificationPreferences: builder.mutation({
      query: (preferences) => ({
        url: "profile/update/",
        method: "PATCH",
        body: preferences,
      }),
         
    }),
     getNotifications: builder.query({
      query: () => "notifications-list/",

      method: "GET",
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useUpdateNameMutation,
  useGetProfileQuery,
  useUpdateNotificationPreferencesMutation,
  useGetNotificationsQuery,
} = shareapi;

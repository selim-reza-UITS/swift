import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from "./api";


export const authapi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login/",
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/send-otp/",
        method: "POST",
        body,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/verify-otp/",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/reset-password/",
        method: "POST",
        body,
      }),
    }),
    setPassword: builder.mutation({
      query: (body) => ({
        url: `/auth/set-password/${body.uuid}/${body.token}/`,
        method: "POST",
        body: { password: body.password },
      }),
    }),

    chat: builder.mutation({
      query: (body) => ({
        url: "/api/v1/chat/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["chatSessions"],
    }),
    getChatSessions: builder.query({
      query: () => ({
        url: "/api/v1/chat/sessions/",
        method: "GET",
      }),
      providesTags: ["chatSessions"],
    }),
    getChatMessages: builder.query({
      query: (sessionId) => ({
        url: `/api/v1/chat/sessions/${sessionId}/`,
        method: "GET",
      }),
      providesTags: (result, error, sessionId) => [
        { type: "chatSessions", id: sessionId },
      ],
    }),
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "/api/v1/profile/",
        method: "PUT",
        body: formData,
        // Don't set Content-Type header, let the browser set it for FormData
      }),
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: "/api/v1/user-profile/",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useChatMutation,
  useGetChatSessionsQuery,
  useGetChatMessagesQuery,
  useUpdateProfileMutation,
  useGetUserProfileQuery,
  useSetPasswordMutation,
} = authapi;

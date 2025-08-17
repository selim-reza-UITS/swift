import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://10.10.13.19:8003/api/v1/",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.access || null;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    } else {
      const authString = localStorage.getItem("auth");
      let authData = null;
      if (authString) {
        try {
          authData = JSON.parse(authString);
        } catch (e) {
          authData = null;
        }
      }
      if (authData?.access) {
        headers.set("authorization", `Bearer ${authData.access}`);
      }
    }
    return headers;
  },
});

export const authapi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  tagTypes: ["users", "chatSessions"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/api/v1/register/",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login/",
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/api/v1/forgot-password/",
        method: "POST",
        body,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: "/api/v1/verify-otp/",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/api/v1/reset-password/",
        method: "POST",
        body,
      }),
    }),
    // This endpoint will automatically include the Authorization header if the user is logged in
    // and the access token is present in Redux state or localStorage (see baseQuery above).
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
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useChatMutation,
  useGetChatSessionsQuery,
  useGetChatMessagesQuery,
  useUpdateProfileMutation,
  useGetUserProfileQuery,
} = authapi;

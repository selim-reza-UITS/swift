import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.access || null;
    console.log(token);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
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
        headers.set("Authorization", `Bearer ${authData.access}`);
      }
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,

  tagTypes: [
    "users",
    "LawFirm",
    "Billing",
    "intake",
    "case",
    "chatSessions",
    "Lawyer",
  ],

  endpoints: () => ({}),
});

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

export const api = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["users"],
  endpoints: () => ({}),
});

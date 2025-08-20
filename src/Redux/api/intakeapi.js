import { api } from "./api";

export const intakeapi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => "users/",
      invalidatesTags: ["intake"],
    }),

    getAllLawyer: builder.query({
      query: () => "lawyers/list/",
      invalidatesTags: ["intake"],
    }),

    getAllClients: builder.query({
      query: () => "clients/",
      providesTags: ["intake"],
    }),

    createClient: builder.mutation({
      query: (body) => ({
        url: "clients/create/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["intake"],
    }),
    getClientById: builder.query({
      query: (id) => `clients/${id}/detail/`, // Use the dynamic ID here
      providesTags: ["intake"],
    }),
  }),
});

export const {
  // Newly added hooks for dynamic dropdowns
  useGetAllUserQuery,
  useGetClientByIdQuery,
  useGetAllLawyerQuery,
  useGetAllClientsQuery,
  useCreateClientMutation,
} = intakeapi;

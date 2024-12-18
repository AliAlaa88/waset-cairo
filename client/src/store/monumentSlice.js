import apiSlice from "./apiSlice";

const monumentsUrl = "/monuments";

export const monumentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMonuments: builder.query({
      query: () => ({ url: monumentsUrl, method: "GET", credentials: "include"}),
    }),
    getMonument: builder.query({
      query: (id) => `${monumentsUrl}/${id}`,
    }),
    addMonument: builder.mutation({
      query: (monument) => ({
        url: monumentsUrl,
        method: "POST",
        body: monument,
      }),
    }),
    deleteMonument: builder.mutation({
      query: (id) => ({
        url: `${monumentsUrl}/${id}`,
        method: "DELETE",
      }),
    }),
    updateMonument: builder.mutation({
      query: (monument) => ({
        url: `${monumentsUrl}/${monument.id}`,
        method: "PUT",
        body: monument,
      }),
    }),
  }),
});

export const {
  useGetMonumentsQuery,
  useGetMonumentQuery,
  useAddMonumentMutation,
  useDeleteMonumentMutation,
  useUpdateMonumentMutation,
} = monumentSlice;
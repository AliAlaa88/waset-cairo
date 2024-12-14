import apiSlice from "./apiSlice";

const monumentsUrl = "/monuments";

export const monumentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMonuments: builder.query({
      query: () => ({ url: monumentsUrl, method: "GET" }),
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
  }),
});

export const {
  useGetMonumentsQuery,
  useGetMonumentQuery,
  useAddMonumentMutation,
  useDeleteMonumentMutation,
} = monumentSlice;
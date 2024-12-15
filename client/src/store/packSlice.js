import apiSlice from "./apiSlice";

const packsUrl = "/packs";

export const packSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPacks: builder.query({
      query: () => ({ url: packsUrl, method: "GET" }),
    }),
    getPack: builder.query({
      query: (id) => `${packsUrl}/${id}`,
    }),
    addPack: builder.mutation({
      query: (pack) => ({
        url: packsUrl,
        method: "POST",
        body: pack,
      }),
    }),
    updatePack: builder.mutation({
      query: (pack) => ({
        url: `${packsUrl}/${pack.id}`,
        method: "PUT",
        body: pack,
      }),
    }),
    deletePack: builder.mutation({
      query: (id) => ({
        url: `${packsUrl}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPacksQuery,
  useGetPackQuery,
  useAddPackMutation,
  useUpdatePackMutation,
  useDeletePackMutation,
} = packSlice;
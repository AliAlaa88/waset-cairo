import apiSlice from "./apiSlice";

const packsUrl = "/packs";

export const packSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPacks: builder.query({
      query: () => ({ url: packsUrl, method: "GET", credentials: 'include' }),
    }),
    getPack: builder.query({
      query: (id) => ({ url: `${packsUrl}/${id}`, credentials: 'include' }),
    }),
    addPack: builder.mutation({
      query: (pack) => ({
        url: packsUrl,
        method: "POST",
        body: pack,
        credentials: 'include',
      }),
    }),
    updatePack: builder.mutation({
      query: (pack) => ({
        url: `${packsUrl}/${pack.id}`,
        method: "PUT",
        body: pack,
        credentials: 'include',
      }),
    }),
    deletePack: builder.mutation({
      query: (id) => ({
        url: `${packsUrl}/${id}`,
        method: "DELETE",
        credentials: 'include',
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
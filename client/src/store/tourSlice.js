import apiSlice from "./apiSlice";

const toursUrl = "/tours";

export const tourSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTours: builder.query({
      query: () => ({ url: toursUrl, method: "GET" }),
    }),
    getTour: builder.query({
      query: (id) => `${toursUrl}/${id}`,
    }),
    addTour: builder.mutation({
      query: (tour) => ({
        url: toursUrl,
        method: "POST",
        body: tour,
      }),
    }),
    deleteTour: builder.mutation({
      query: (id) => ({
        url: `${toursUrl}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetToursQuery,
  useGetTourtQuery,
  useAddTourMutation,
  useDeleteTourMutation,
} = tourSlice;

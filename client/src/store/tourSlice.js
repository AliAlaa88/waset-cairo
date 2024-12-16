import apiSlice from "./apiSlice";

const toursUrl = "/tours";

export const tourSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTours: builder.query({
      query: () => ({ url: toursUrl, method: "GET" }),
    }),
    getToursThatDidntStart: builder.query({
      query: () => ({ url: `${toursUrl}/didnt-start`, method: "GET" }),
    }),
    getTour: builder.query({
      query: (id) => `${toursUrl}/${id}`,
    }),
    getTouristsGoingToTour: builder.query({
      query: (tourid) => ({ url: `${toursUrl}/tourists/${tourid}`, method: "GET" }),
    }),
    getToursByGuide: builder.query({
      query: (guideid) => ({ url: `${toursUrl}/guide/${guideid}`, method: "GET" }),
    }),
    getTouristTourHistory: builder.query({
      query: (touristid) => ({ url: `${toursUrl}/tourist/${touristid}`, method: "GET" }),
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
  useGetToursThatDidntStartQuery,
  useGetTourQuery,
  useGetTouristsGoingToTourQuery,
  useGetToursByGuideQuery,
  useGetTouristTourHistoryQuery,
  useAddTourMutation,
  useDeleteTourMutation,
} = tourSlice;

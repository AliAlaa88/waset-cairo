import apiSlice from "./apiSlice";

const toursUrl = "/tours";

export const tourSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTours: builder.query({
      query: () => ({ url: toursUrl, method: "GET", credentials: 'include' }),
    }),
    getToursThatDidntStart: builder.query({
      query: () => ({ url: `${toursUrl}/didnt-start`, method: "GET", credentials: 'include' }),
    }),
    getTour: builder.query({
      query: (id) => ({ url: `${toursUrl}/${id}`, method: "GET", credentials: 'include' }),
    }),
    getTouristsGoingToTour: builder.query({
      query: (tourid) => ({ url: `${toursUrl}/tourists/${tourid}`, method: "GET", credentials: 'include' }),
    }),
    getToursByGuide: builder.query({
      query: (guideid) => ({ url: `${toursUrl}/guide/${guideid}`, method: "GET", credentials: 'include' }),
    }),
    getTouristTourHistory: builder.query({
      query: (touristid) => ({ url: `${toursUrl}/tourist/${touristid}`, method: "GET", credentials: 'include' }),
    }),
    addTour: builder.mutation({
      query: (tour) => ({
        url: toursUrl,
        method: "POST",
        body: tour,
        credentials: 'include',
      }),
    }),
    updateTour: builder.mutation({
      query: (tour) => ({
        url: `${toursUrl}/${tour.id}`,
        method: "PUT",
        body: tour,
        credentials: "include"
      })
    }),
    deleteTour: builder.mutation({
      query: (id) => ({
        url: `${toursUrl}/${id}`,
        method: "DELETE",
        credentials: 'include',
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
  useUpdateTourMutation,
  useDeleteTourMutation,
} = tourSlice;

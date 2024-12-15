import apiSlice from "./apiSlice";

const eventsUrl = "/events";

export const eventSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => ({ url: eventsUrl, method: "GET" }),
    }),
    getEvent: builder.query({
      query: (id) => `${eventsUrl}/${id}`,
    }),
    addEvent: builder.mutation({
      query: (event) => ({
        url: eventsUrl,
        method: "POST",
        body: event,
      }),
    }),
    updateEvent: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${eventsUrl}/${id}`,
        method: "PUT",
        body: patch,
      }),
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `${eventsUrl}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventQuery,
  useAddEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventSlice;
import apiSlice from "./apiSlice";

const eventsUrl = "/events";

export const eventSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => ({ 
        url: eventsUrl, 
        method: "GET",
        credentials: 'include'
      }),
    }),
    getEvent: builder.query({
      query: (id) => ({
        url: `${eventsUrl}/${id}`,
        credentials: 'include'
      }),
    }),
    addEvent: builder.mutation({
      query: (event) => ({
        url: eventsUrl,
        method: "POST",
        body: event,
        credentials: 'include'
      }),
    }),
    updateEvent: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `${eventsUrl}/${id}`,
        method: "PUT",
        body: patch,
        credentials: 'include'
      }),
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `${eventsUrl}/${id}`,
        method: "DELETE",
        credentials: 'include'
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
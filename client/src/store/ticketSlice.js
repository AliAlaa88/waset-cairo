import apiSlice from "./apiSlice";

const ticketsUrl = "/ticket";

export const ticketSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: () => ({ url: ticketsUrl, method: "GET" }),
    }),
    addTicket: builder.mutation({
      query: (ticket) => ({
        url: ticketsUrl,
        method: "POST",
        body: ticket,
      }),
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useAddTicketMutation,
} = ticketSlice;
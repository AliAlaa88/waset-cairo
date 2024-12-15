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
    updateTicket: builder.mutation({
      query: (ticket) => ({
        url: `${ticketsUrl}/${ticket.id}`,
        method: "PUT",
        body: ticket,
      }),
    }),
    deleteTicket: builder.mutation({
      query: (id) => ({
        url: `${ticketsUrl}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useAddTicketMutation,
  useUpdateTicketMutation,
  useDeleteTicketMutation
} = ticketSlice;
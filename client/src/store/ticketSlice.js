import apiSlice from "./apiSlice";

const ticketsUrl = "/ticket";

export const ticketSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: () => ({ 
        url: ticketsUrl, 
        method: "GET",
        credentials: 'include' 
      }),
    }),
    addTicket: builder.mutation({
      query: (ticket) => ({
        url: ticketsUrl,
        method: "POST",
        body: ticket,
        credentials: 'include'
      }),
    }),
    updateTicket: builder.mutation({
      query: (ticket) => ({
        url: `${ticketsUrl}/${ticket.id}`,
        method: "PUT",
        body: ticket,
        credentials: 'include'
      }),
    }),
    deleteTicket: builder.mutation({
      query: (id) => ({
        url: `${ticketsUrl}/${id}`,
        method: "DELETE",
        credentials: 'include'
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
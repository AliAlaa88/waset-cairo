import apiSlice from "./apiSlice";

const feedbacksUrl = "/feedbacks";

export const feedbackSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeedbacks: builder.query({
      query: () => ({ url: feedbacksUrl, method: "GET", credentials: 'include' }),
    }),
    getFeedback: builder.query({
      query: (id) => ({ url: `${feedbacksUrl}/${id}`, method: "GET", credentials: 'include' }),
    }),
    getTouristFeedback: builder.query({
      query: (id) => ({ url: `${feedbacksUrl}/tourist/${id}`, method: "GET", credentials: 'include' }),
    }),
    getTourFeedback: builder.query({
      query: (id) => ({ url: `${feedbacksUrl}/tour/${id}`, method: "GET", credentials: 'include' }),
    }),
    addFeedback: builder.mutation({
      query: (feedback) => ({
        url: feedbacksUrl,
        method: "POST",
        body: feedback,
        credentials: 'include',
      }),
    }),
    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `${feedbacksUrl}/${id}`,
        method: "DELETE",
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useGetFeedbacksQuery,
  useGetFeedbackQuery,
  useGetTouristFeedbackQuery,
  useGetTourFeedbackQuery,
  useAddFeedbackMutation,
  useDeleteFeedbackMutation,
} = feedbackSlice;
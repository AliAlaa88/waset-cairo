import apiSlice from "./apiSlice";

const feedbacksUrl = "/feedbacks";

export const feedbackSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeedbacks: builder.query({
      query: () => ({ url: feedbacksUrl, method: "GET" }),
    }),
    getFeedback: builder.query({
      query: (id) => `${feedbacksUrl}/${id}`,
    }),
    getTouristFeedback: builder.query({
      query: (id) => `${feedbacksUrl}/tourist/${id}`,
    }),
    getTourFeedback: builder.query({
      query: (id) => `${feedbacksUrl}/tour/${id}`,
    }),
    addFeedback: builder.mutation({
      query: (feedback) => ({
        url: feedbacksUrl,
        method: "POST",
        body: feedback,
      }),
    }),
    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `${feedbacksUrl}/${id}`,
        method: "DELETE",
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
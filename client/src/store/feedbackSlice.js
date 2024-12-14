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
    addFeedback: builder.mutation({
      query: (feedback) => ({
        url: feedbacksUrl,
        method: "POST",
        body: feedback,
      }),
    }),
  }),
});

export const {
  useGetFeedbacksQuery,
  useGetFeedbackQuery,
  useAddFeedbackMutation,
} = feedbackSlice;
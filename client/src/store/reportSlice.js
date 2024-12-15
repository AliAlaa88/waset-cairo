import apiSlice from "./apiSlice";

const reportsUrl = "/reports";

export const reportSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query({
      query: () => ({ url: reportsUrl, method: "GET" }),
    }),
    getReport: builder.query({
      query: (id) => `${reportsUrl}/${id}`,
    }),
    getGuideReports: builder.query({
      query: (id) => `${reportsUrl}/guide/${id}`,
    }),
    getTourReports: builder.query({
      query: (id) => `${reportsUrl}/tour/${id}`,
    }),
    addReport: builder.mutation({
      query: (report) => ({
        url: reportsUrl,
        method: "POST",
        body: report,
      }),
    }),
    deleteReport: builder.mutation({
      query: (id) => ({
        url: `${reportsUrl}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetReportsQuery,
  useGetReportQuery,
  useGetGuideReportsQuery,
  useGetTourReportsQuery,
  useAddReportMutation,
  useDeleteReportMutation,
} = reportSlice;
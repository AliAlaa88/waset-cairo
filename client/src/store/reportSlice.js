import apiSlice from "./apiSlice";

const reportsUrl = "/reports";

export const reportSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query({
      query: () => ({ url: reportsUrl, method: "GET", credentials: 'include' }),
    }),
    getReport: builder.query({
      query: (id) => ({ url: `${reportsUrl}/${id}`, credentials: 'include' }),
    }),
    getGuideReports: builder.query({
      query: (id) => ({ url: `${reportsUrl}/guide/${id}`, credentials: 'include' }),
    }),
    getTourReports: builder.query({
      query: (id) => ({ url: `${reportsUrl}/tour/${id}`, credentials: 'include' }),
    }),
    addReport: builder.mutation({
      query: (report) => ({
        url: reportsUrl,
        method: "POST",
        body: report,
        credentials: 'include',
      }),
    }),
    deleteReport: builder.mutation({
      query: (id) => ({
        url: `${reportsUrl}/${id}`,
        method: "DELETE",
        credentials: 'include',
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
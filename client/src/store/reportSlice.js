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
    addReport: builder.mutation({
      query: (report) => ({
        url: reportsUrl,
        method: "POST",
        body: report,
      }),
    }),
  }),
});

export const {
  useGetReportsQuery,
  useGetReportQuery,
  useAddReportMutation,
} = reportSlice;
import apiSlice from "./apiSlice";

const usersUrl = "/users";

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTourists: builder.query({
      query: () => ({ url: `${usersUrl}/tourists`, method: "GET" }),
    }),
    getTourist: builder.query({
      query: (id) => ({ url: `${usersUrl}/tourists/${id}`, method: "GET" }),
    }),
    getGuides: builder.query({
      query: () => ({ url: `${usersUrl}/guides`, method: "GET" }),
    }),
    getGuide: builder.query({
      query: (id) => ({ url: `${usersUrl}/guides/${id}`, method: "GET" }),
    }),
  }),
});

export const {
  useGetTouristsQuery,
  useGetTouristQuery,
  useGetGuidesQuery,
  useGetGuideQuery,
} = userSlice;
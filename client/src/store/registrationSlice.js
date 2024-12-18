import apiSlice from "./apiSlice";

const authUrl = "/auth";

export const registrationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  touristSignup: builder.mutation({
    query: (data) => ({
      url: `${authUrl}/tourist/signup`,
      method: "POST",
      body: data,
    }),
  }),
  touristLogin: builder.mutation({
    query: (data) => ({
      url: `${authUrl}/tourist/login`,
      method: "POST",
      body: data,
      credentials: "include"
    }),
  }),
  touristEditProfile: builder.mutation({
    query: (data) => ({
      url: `${authUrl}/tourist/edit`,
      method: "PUT",
      body: data,
    }),
  }),
  touristLogout: builder.mutation({
    query: () => ({
      url: `${authUrl}/tourist/logOut`,
      method: "POST",
    }),
  }),
  guideSignup: builder.mutation({
    query: (data) => ({
      url: `${authUrl}/guide/signup`,
      method: "POST",
      body: data,
    }),
  }),
  guideLogin: builder.mutation({
    query: (data) => ({
      url: `${authUrl}/guide/login`,
      method: "POST",
      body: data,
    }),
  }),
  guideEditProfile: builder.mutation({
    query: (data) => ({
      url: `${authUrl}/guide/edit`,
      method: "PUT",
      body: data,
    }),
  }),
  guideLogout: builder.mutation({
    query: () => ({
      url: `${authUrl}/guide/logOut`,
      method: "POST",
    }),
  }),
  operatorSignup: builder.mutation({
    query: (data) => ({
      url: `${authUrl}/operator/signup`,
      method: "POST",
      body: data,
    }),
  }),
  operatorLogin: builder.mutation({
    query: (data) => ({
      url: `${authUrl}/operator/login`,
      method: "POST",
      body: data,
    }),
  }),
  operatorEditProfile: builder.mutation({
    query: (data) => ({
      url: `${authUrl}/operator/edit`,
      method: "PUT",
      body: data,
    }),
  }),
  operatorLogout: builder.mutation({
    query: () => ({
      url: `${authUrl}/operator/logOut`,
      method: "POST",
    }),
  }),
  updatePassword: builder.mutation({
    query: (data) => ({
      url: `${authUrl}/change-password`,
      method: "PUT",
      body: data,
    }),
  }),
  }),
});

export const {
  useTouristSignupMutation,
  useTouristLoginMutation,
  useTouristEditProfileMutation,
  useTouristLogoutMutation,
  useGuideSignupMutation,
  useGuideLoginMutation,
  useGuideEditProfileMutation,
  useGuideLogoutMutation,
  useOperatorSignupMutation,
  useOperatorLoginMutation,
  useOperatorEditProfileMutation,
  useOperatorLogoutMutation,
  useUpdatePasswordMutation,
} = registrationSlice;
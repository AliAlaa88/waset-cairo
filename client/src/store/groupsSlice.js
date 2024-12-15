import apiSlice from "./apiSlice";

const groupsUrl = "/groups";

export const groupSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: () => ({ url: groupsUrl, method: "GET" }),
    }),
    getGroup: builder.query({
      query: (id) => `${groupsUrl}/${id}`,
    }),
    getGroupMembers: builder.query({
      query: (id) => `${groupsUrl}/members/${id}`,
    }),
    getTouristGroups: builder.query({
      query: (id) => `${groupsUrl}/tourist/${id}`,
    }),
    addGroup: builder.mutation({
      query: (group) => ({
        url: groupsUrl,
        method: "POST",
        body: group,
      }),
    }),
    deleteGroup: builder.mutation({
      query: (id) => ({
        url: `${groupsUrl}/${id}`,
        method: "DELETE",
      }),
    }),
    joinGroup: builder.mutation({
      query: (id) => ({
        url: `${groupsUrl}/join/${id}`,
        method: "POST",
      }),
    }),
    leaveGroup: builder.mutation({
      query: (id) => ({
        url: `${groupsUrl}/leave/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetGroupQuery,
  useGetGroupMembersQuery,
  useGetTouristGroupsQuery,
  useAddGroupMutation,
  useDeleteGroupMutation,
  useJoinGroupMutation,
  useLeaveGroupMutation,
} = groupSlice;
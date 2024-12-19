import apiSlice from "./apiSlice";

const groupsUrl = "/groups";

export const groupSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: () => ({ url: groupsUrl, method: "GET", credentials: "include" }),
    }),
    getGroup: builder.query({
      query: (id) => ({ url: `${groupsUrl}/${id}`, method: "GET", credentials: "include" }),
    }),
    getGroupMembers: builder.query({
      query: (id) => ({ url: `${groupsUrl}/members/${id}`, method: "GET", credentials: "include" }),
    }),
    getTouristGroups: builder.query({
      query: (id) => ({ url: `${groupsUrl}/tourist/my/${id}`, method: "GET", credentials: "include" }),
    }),
    getOtherGroups: builder.query({
      query: (id) => ({ url: `${groupsUrl}/tourist/other/${id}`, method: "GET", credentials: "include" }),
    }),
    addGroup: builder.mutation({
      query: (group) => ({
        url: groupsUrl,
        method: "POST",
        body: group,
        credentials: "include",
      }),
    }),
    deleteGroup: builder.mutation({
      query: (id) => ({
        url: `${groupsUrl}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    joinGroup: builder.mutation({
      query: (id) => ({
        url: `${groupsUrl}/join/${id}`,
        method: "POST",
        credentials: "include",
      }),
    }),
    leaveGroup: builder.mutation({
      query: (id) => ({
        url: `${groupsUrl}/leave/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
	useGetGroupsQuery,
	useGetGroupQuery,
	useGetGroupMembersQuery,
  useGetTouristGroupsQuery,
  useGetOtherGroupsQuery,
	useAddGroupMutation,
	useDeleteGroupMutation,
	useJoinGroupMutation,
	useLeaveGroupMutation,
} = groupSlice;

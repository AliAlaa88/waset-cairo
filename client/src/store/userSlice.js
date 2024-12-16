import apiSlice from "./apiSlice";

const userUrl = "/user";

export const userSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTourists: builder.query({
			query: () => ({ url: `${userUrl}/tourists`, method: "GET" }),
		}),
		getTourist: builder.query({
			query: (id) => ({ url: `${userUrl}/tourists/${id}`, method: "GET" }),
		}),
		getGuides: builder.query({
			query: () => ({ url: `${userUrl}/guides`, method: "GET" }),
		}),
		getGuide: builder.query({
			query: (id) => ({ url: `${userUrl}/guides/${id}`, method: "GET" }),
		}),
		promoteTourist: builder.mutation({
			query: (id) => ({
				url: `${userUrl}/tourists/promote/${id}`,
				method: "PUT",
			}),
		}),
		banTourist: builder.mutation({
			query: (id) => ({ url: `${userUrl}/tourists/ban/${id}`, method: "PUT" }),
		}),
		getTouristFavExperience: builder.query({
			query: () => ({ url: `${userUrl}/tourists/fav`, method: "GET" }),
		}),
		getTouristInsights: builder.query({
			query: (touristid) => ({
				url: `${userUrl}/tourists/insights/${touristid}`,
				method: "GET",
			}),
		}),
		promoteGuide: builder.mutation({
			query: (id) => ({
				url: `${userUrl}/guides/promote/${id}`,
				method: "PUT",
			}),
		}),
		getOperatorPackages: builder.query({
			query: (opid) => ({
				url: `${userUrl}/operators/packs/${opid}`,
				method: "GET",
			}),
		}),
		getOperatorEvents: builder.query({
			query: (opid) => ({
				url: `${userUrl}/operators/events/${opid}`,
				method: "GET",
			}),
		}),
	}),
});

export const {
  useGetTouristsQuery,
  useGetTouristQuery,
  useGetGuidesQuery,
  useGetGuideQuery,
  usePromoteTouristMutation,
  useBanTouristMutation,
  useGetTouristFavExperienceQuery,
  useGetTouristInsightsQuery,
  usePromoteGuideMutation,
  useGetOperatorPackagesQuery,
  useGetOperatorEventsQuery,
} = userSlice;

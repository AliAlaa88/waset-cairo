import apiSlice from "./apiSlice";

const userUrl = "/user";

export const userSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTourists: builder.query({
			query: () => ({ url: `${userUrl}/tourists`, method: "GET", credentials: 'include' }),
		}),
		getTourist: builder.query({
			query: (id) => ({ url: `${userUrl}/tourists/${id}`, method: "GET", credentials: 'include' }),
		}),
		getGuides: builder.query({
			query: () => ({ url: `${userUrl}/guides`, method: "GET", credentials: 'include' }),
		}),
		getGuide: builder.query({
			query: (id) => ({ url: `${userUrl}/guides/${id}`, method: "GET", credentials: 'include' }),
		}),
		promoteTourist: builder.mutation({
			query: (id) => ({
				url: `${userUrl}/tourists/promote/${id}`,
				method: "PUT",
				credentials: 'include',
			}),
		}),
		banTourist: builder.mutation({
			query: (id) => ({ url: `${userUrl}/tourists/ban/${id}`, method: "PUT", credentials: 'include' }),
		}),
		unbanTourist: builder.mutation({
			query: (id) => ({url: `${userUrl}/tourists/unban/${id}`, method: "PUT", credentials: "include"}),
		}),
		getTouristFavExperience: builder.query({
			query: () => ({ url: `${userUrl}/tourists/fav`, method: "GET", credentials: 'include' }),
		}),
		getTouristInsights: builder.query({
			query: () => ({
				url: `${userUrl}/tourists/insights`,
				method: "GET",
				credentials: 'include',
			}),
		}),
		getTouristsGoingToGuideTours: builder.query({
			query: (guideid) => ({
				url: `${userUrl}/guides/touristsInTours/${guideid}`,
				method: "GET",
				credentials: 'include'
			})
		}),
		promoteGuide: builder.mutation({
			query: (id) => ({
				url: `${userUrl}/guides/promote/${id}`,
				method: "PUT",
				credentials: 'include',
			}),
		}),
		getOperatorPackages: builder.query({
			query: () => ({
				url: `${userUrl}/operators/packs`,
				method: "GET",
				credentials: 'include',
			}),
		}),
		getOperatorEvents: builder.query({
			query: () => ({
				url: `${userUrl}/operators/events`,
				method: "GET",
				credentials: 'include',
			}),
		}),
		getOperatorDashboard: builder.query({
			query: () =>({
				url: `${userUrl}/operators/dashboard`,
				method: "GET",
				credentials: "include"
			})
		}),
		getCurrUserData: builder.query({
			query: () => ({
				url: `${userUrl}/currUser`,
				method: "GET",
				credentials: "include"
			})
		}),
		getTopPerformingGuides: builder.query({
			query: () => ({
				url: `${userUrl}/guides/top-performing`,
				method: "GET",
				credentials: "include"
			})	
		}),
		getTouristsDemographics: builder.query({
			query: () => ({
				url: `${userUrl}/tourists/demographics`, 
				method: "GET",
				credentials: "include"
			})
		})
	}),
});

export const {
	useGetTouristsQuery,
	useGetTouristQuery,
	useGetGuidesQuery,
	useGetGuideQuery,
	usePromoteTouristMutation,
	useBanTouristMutation,
	useUnbanTouristMutation,
	useGetTouristFavExperienceQuery,
	useGetTouristInsightsQuery,
	useGetTouristsGoingToGuideToursQuery,
	usePromoteGuideMutation,
	useGetOperatorPackagesQuery,
	useGetOperatorEventsQuery,
	useGetOperatorDashboardQuery,
	useGetCurrUserDataQuery,
	useGetTopPerformingGuidesQuery,
	useGetTouristsDemographicsQuery
} = userSlice;

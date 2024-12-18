import apiSlice from "./apiSlice";

const monumentsUrl = "/monuments";

export const monumentSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getMonuments: builder.query({
			query: () => ({
				url: monumentsUrl,
				method: "GET",
				credentials: "include",
			}),
		}),
		getMonument: builder.query({
			query: (id) => ({
				url: `${monumentsUrl}/${id}`,
				method: "GET",
				credentials: "include",
			}),
		}),
		addMonument: builder.mutation({
			query: (monument) => ({
				url: monumentsUrl,
				method: "POST",
				body: monument,
				credentials: "include",
			}),
		}),
		deleteMonument: builder.mutation({
			query: (id) => ({
				url: `${monumentsUrl}/${id}`,
				method: "DELETE",
				credentials: "include",
			}),
		}),
		updateMonument: builder.mutation({
			query: (monument) => ({
				url: `${monumentsUrl}/${monument.id}`,
				method: "PUT",
				body: monument,
				credentials: "include",
			}),
		}),
	}),
});

export const {
	useGetMonumentsQuery,
	useGetMonumentQuery,
	useAddMonumentMutation,
	useDeleteMonumentMutation,
	useUpdateMonumentMutation,
} = monumentSlice;

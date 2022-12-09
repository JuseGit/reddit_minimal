import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Define a service using a base URL and expected endpoints
export const api = createApi({
	reducerPath: "redditApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://www.reddit.com/" }),
	keepUnusedDataFor: 5,
	endpoints: (builder) => ({
		getSubreddits: builder.query({
			query: () => ({ url: `subreddits.json?limit=10&t=year` }),
			transformResponse: (response, meta, arg) => response.data.children,
		}),
		getPosts: builder.query({
			query: (subreddit) => `r/${subreddit}.json`,
			transformResponse: (response, meta, arg) => response.data.children,
		}),
		getComments: builder.query({
			query: ({ subreddit, postID }) => `r/${subreddit}/comments/${postID}.json`,
			transformResponse: (response, meta, arg) => {
				if (response[1].kind !== "more") return response[1].data.children
			},
		}),
	}),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSubredditsQuery, useGetPostsQuery, useGetCommentsQuery } = api

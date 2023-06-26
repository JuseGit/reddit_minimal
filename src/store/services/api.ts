import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Subreddits, Subreddit } from "../../typings/api/subreddits.types";
import { Posts, IPost } from "../../typings/api/posts.types";
import { Comments, Comment } from "../../typings/api/comments.types";
import { Listing, Thing } from "../../typings/api/api-data.types";

type CommentsProps = {
  subreddit: string;
  postID: string;
};

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "redditApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://www.reddit.com/" }),
  keepUnusedDataFor: 5,
  endpoints: (builder) => ({
    getSubreddits: builder.query<Thing<Subreddit>[], void>({
      query: () => ({ url: `subreddits.json?limit=10&t=year` }),
      transformResponse: (response: Subreddits) => response.data.children,
    }),
    getPosts: builder.query<Thing<IPost>[], string>({
      query: (subreddit) => `r/${subreddit}.json`,
      transformResponse: (response: Posts) => response.data.children,
    }),
    getComments: builder.query<Thing<Comment>[], CommentsProps>({
      query: ({ subreddit, postID }) =>
        `r/${subreddit}/comments/${postID}.json`,
      transformResponse: (response: Comments[]) =>
        response[1].kind !== "more" ? response[1].data.children : [],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSubredditsQuery, useGetPostsQuery, useGetCommentsQuery } =
  api;

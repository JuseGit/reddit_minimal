import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getTimeDiff, format_votes } from '../../lib/date_conversions.js'


const subreddit1Posts = [
	{
		user: 'User1',
		name: 'Post1',
		img: undefined
	},
	{
		user: 'User2',
		name: 'Post2',
		img: undefined
	}
];

const subreddit2Posts = [
	{
		user: 'User3',
		name: 'Post1',
		img: undefined
	},
	{
		user: 'User4',
		name: 'Post1',
		img: undefined
	}
];


export const fetchPosts = createAsyncThunk (
	'posts/fetchPosts',
	async (subreddit) => {
		const response = await axios.get(`https://www.reddit.com/r/${subreddit}.json`);
		//console.log(response.data.data);

		// This is the array with posts data.
		return response.data.data.children;
	}
)


const postsSlice = createSlice({
	name: 'posts',

	initialState: {
		posts: [],
		hasLoadedPosts: false,
		hasError: false,
		searchText: ""
	},

	reducers: {
		updatePosts: (state, action) => {
			state.posts.splice(0, state.posts.length);
			if( action.payload === 'subreddit2' ) {
				state.posts = subreddit2Posts;
			} else {
				state.posts = subreddit1Posts;
			}
		},

		setSearchText: (state, action) => {
			// NOTE: might need to reset the word
			if( action.payload !== undefined ) {
				state.searchText = action.payload;
			}
		}
	},

	extraReducers: {
		[fetchPosts.pending]: (state, action) => {
			state.posts = [];
			state.hasLoadedPosts = false;
			state.hasError = false;
		},
		[fetchPosts.fulfilled]: (state, action) => {
			if( action.payload !== undefined ) {
				action.payload.forEach((item, i) => {
					const { id, name, title, author, created_utc, num_comments, post_hint, url, score } = item.data;
					const time_frame = getTimeDiff(created_utc);
					const img_url = post_hint !== "image" ? undefined : url;
					const votes = format_votes(score);

					state.posts.push( {id, name, title, author, time_frame, num_comments, img_url, votes} );
				});
			}

			state.hasLoadedPosts = true;
			state.hasError = false;
		},
		[fetchPosts.rejected]: (state, action) => {
			state.hasLoadedPosts = false;
			state.hasError = true;
		}
	}
});

export const { updatePosts, setSearchText } = postsSlice.actions;
export const selectPosts = (state) => state.posts.posts;
export const selectHasLoadedPosts = (state) => state.posts.hasLoadedPosts;
export const selectSearchText = (state) => state.posts.searchText;

export default postsSlice.reducer;

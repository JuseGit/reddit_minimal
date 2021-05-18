import { createSlice } from '@reduxjs/toolkit'


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


const postsSlice = createSlice({
	name: 'posts',

	initialState: {
		posts: subreddit1Posts,
		isLoadingPosts: false,
		hasError: false
	},

	reducers: {
		updatePosts: (state, action) => {
			state.posts.splice(0, state.posts.length);
			if( action.payload === 'subreddit2' ) {
				state.posts = subreddit2Posts;
			} else {
				state.posts = subreddit1Posts;
			}
		}
	},

});

export const { updatePosts } = postsSlice.actions;
export const selectPosts = (state) => state.posts.posts;

export default postsSlice.reducer;

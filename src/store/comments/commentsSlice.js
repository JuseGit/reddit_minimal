import { createSlice } from '@reduxjs/toolkit'


const Post1Comments = [
	{
		user: 'User1',
		text: 'test1'
	},
	{
		user: 'User2',
		text: 'test2'
	}
];

const Post2Comments = [
	{
		user: 'User2',
		text: 'test1'
	},
	{
		user: 'User3',
		text: 'test2'
	}
];


const commentsSlice = createSlice({
	name: 'comments',

	initialState: {
		comments:  {
			Post1: Post1Comments,
			Post2: Post2Comments,
		},
		isLoadingComments: false,
		hasError: false
	},
});

export const selectComments = (state) => state.comments.comments;

export default commentsSlice.reducer;

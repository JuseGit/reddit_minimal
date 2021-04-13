import { createSlice } from '@reduxjs/toolkit'


const subredditsSlice = createSlice({
	name: 'subreddits',
	initialState: {
		subreddits: [
			{
				name: 'test',
				img: undefined,
				description: 'test'
			}
		],
		isLoadingSubreddits: false,
		hasError: false
	},
	reducers: {},

});

export const selectSubreddits = (state) => state.subreddits.subreddits;

export default subredditsSlice.reducer;

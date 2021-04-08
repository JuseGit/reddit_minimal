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

export default subredditsSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const fetchSubreddits = createAsyncThunk (
	'subreddits/fetchSubreddits',
	async () => {
		const response = await fetch('https://www.reddit.com/best.json?limit=10&t=year');
		const redditData = await response.json();

		//console.log(redditData.data.children);
		// This is the array with subreddits data.
		return redditData.data.children;
	}
)

const subredditsSlice = createSlice({
	name: 'subreddits',
	initialState: {
		subreddits: [],
		isLoadingSubreddits: false,
		hasError: false
	},

	reducers: {
		addSubreddits(state, action) {
			state.subreddits = action.payload;
		}
	},

	extraReducers: {
		[fetchSubreddits.pending]: (state, action) => {
			state.isLoadingSubreddits = true;
			state.hasError = false;
		},
		[fetchSubreddits.fulfilled]: (state, action) => {
			if( action.payload !== undefined ) {
				action.payload.forEach((item, i) => {
					const subredditInfo = item.data;
					state.subreddits.push(subredditInfo);
				});
			}

			state.isLoadingSubreddits = false;
			state.hasError = false;
		},
		[fetchSubreddits.rejected]: (state, action) => {
			state.isLoadingSubreddits = false;
			state.hasError = true;
		}
	}
});

export const selectSubreddits = (state) => state.subreddits.subreddits;

export default subredditsSlice.reducer;

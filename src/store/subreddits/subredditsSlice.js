import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchSubreddits = createAsyncThunk (
	'subreddits/fetchSubreddits',
	async () => {
		const response = await axios.get('https://www.reddit.com/best.json?limit=10&t=year');
		//console.log(response.data.data);
		
		// This is the array with subreddits data.
		return response.data.data.children;
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

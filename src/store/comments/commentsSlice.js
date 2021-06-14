import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getTimeDiff, getPostedTime } from '../../lib/date_conversions.js';


export const fetchComments = createAsyncThunk (
	'comments/fetchComments',
	async ({postID, subreddit}) => {
		const response = await axios.get(`https://www.reddit.com/r/${subreddit}/comments/${postID}.json`);
		//console.log(response.data[1].data);

		// This is the array with posts data.
		return response.data[1].data.children;
	}
)


const commentsSlice = createSlice({
	name: 'comments',

	initialState: {
		comments: {},
		isLoadingComments: false,
		hasError: false
	},

	extraReducers: {
		[fetchComments.pending]: (state, action) => {
			state.isLoadingComments = true;
			state.hasError = false;
		},
		[fetchComments.fulfilled]: (state, action) => {
			if( action.payload !== undefined ) {
				action.payload.forEach((item, i) => {
					if( item.kind !== 'more' ) {
						const { link_id, id, author, body, created_utc } = item.data;
						const time_frame = getTimeDiff(created_utc);
						const commented_time = getPostedTime(time_frame);

						if( i === 0 ) {
							state.comments[link_id] = [];
						}
						state.comments[link_id].push({ id, author, body, commented_time });
					}
				});
			}

			state.isLoadingComments = false;
			state.hasError = false;
		},
		[fetchComments.rejected]: (state, action) => {
			state.isLoadingComments = false;
			state.hasError = true;
		}
	}
});

export const selectComments = (state) => state.comments.comments;

export default commentsSlice.reducer;

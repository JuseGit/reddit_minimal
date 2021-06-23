import { default as postsReducer, selectPosts, updatePosts } from '../postsSlice.js';
import { Reducer, Selector } from 'redux-testkit';


const initialState = {
	posts: [],
	hasLoadedPosts: false,
	hasError: false
}

describe('store/posts/postsSlice', () => {
	describe('actions', () => {
		it('should create an action to update list of posts for the selected subreddit', () => {
			const exp_action = {
				type: 'posts/updatePosts'
			};

			expect(updatePosts()).toEqual(exp_action);
		});
	});

	describe('posts reducer', () => {
		it('should return reducer initial state', () => {
			expect(postsReducer(undefined, {})).toEqual(initialState);
			//Reducer(postsReducer).expect({type: undefined}).toReturnState(initialState);
		});

		// it('returns posts initial state', () => {
		// 	Selector(selectPosts).expect(initialState).toReturn([]);
		// });
	});

});

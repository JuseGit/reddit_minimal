import { default as postsReducer, selectPosts, updatePosts } from '../postsSlice.js';
import { Reducer, Selector } from 'redux-testkit';


const emptyState = {
	posts: [{
			  user: 'User1',
			  name: 'Post1',
			  img: undefined
		  },
		  {
			  user: 'User2',
			  name: 'Post1',
			  img: undefined
		  }
    ],
    isLoadingPosts: false,
    hasError: false
};

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
			//expect(postsReducer(undefined, {})).toEqual(emptyState);
			Reducer(postsReducer).expect({type: undefined}).toReturnState(emptyState);
		});

		it('returns posts initial state', () => {
			const state = {
				posts: {
					posts: [
						{
						  user: 'User1',
						  name: 'Post1',
						  img: undefined
						},
						{
						  user: 'User2',
						  name: 'Post1',
						  img: undefined
						}
					]
				}
			}

			const expState = [
				{
				  user: 'User1',
				  name: 'Post1',
				  img: undefined
				},
				{
				  user: 'User2',
				  name: 'Post1',
				  img: undefined
				}
			]

			Selector(selectPosts).expect(state).toReturn(expState);
		});

		it('should handle updatePosts action', () => {
			const posts = [{
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

			const action = { type: 'posts/updatePosts', payload: 'subreddit2' };

			//expect(postsReducer(emptyState, action)).toEqual({...emptyState, posts});
			Reducer(postsReducer).expect(action).toReturnState({...emptyState, posts});
		});
	});

});

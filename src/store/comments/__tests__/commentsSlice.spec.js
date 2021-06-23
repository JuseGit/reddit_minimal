import { default as commentsReducer, selectComments } from '../commentsSlice.js';
import { Reducer, Selector } from 'redux-testkit';


describe ( 'store/comments/commentsSlice', () => {
	// describe('actions', () => {
	// });

	describe('reducer', () => {

		it('returns empty state', () => {
			//expect(postsReducer(undefined, {})).toEqual(emptyState);
			const emptyState = {
				comments: {},
				hasLoadedComments: false,
				hasError: false
			}

			Reducer(commentsReducer).withState(emptyState).expect({type: undefined }).toReturnState(emptyState);
		});
	});

})

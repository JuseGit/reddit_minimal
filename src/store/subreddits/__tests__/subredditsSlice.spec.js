import { default as subredditsReducer, selectSubreddits } from '../subredditsSlice.js';
import { Selector } from 'redux-testkit';


const emptyState = {
	subreddits: [
  	  {
  		  name: 'test',
  		  img: undefined,
  		  description: 'test'
  	  }
    ],
    isLoadingSubreddits: false,
    hasError: false
};

describe('store/subreddits/subredditsSlice', () => {

	it('should return initial state', () => {
		expect(subredditsReducer(undefined, {})).toEqual(emptyState);
	});

	it('returns subreddits initial state', () => {
		const state = {
			subreddits: {
				subreddits: [
					{
						name: 'test',
						img: undefined,
						description: 'test'
					}
				]
			}
		}

		const expState = [
			{
				name: 'test',
				img: undefined,
				description: 'test'
			}
		]

		Selector(selectSubreddits).expect(state).toReturn(expState);
	});
});

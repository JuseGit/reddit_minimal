import { default as subredditsReducer } from '../subredditsSlice.js';


describe('store/subreddits/subredditsSlice', () => {

	it('should return initial state', () => {
		const expState = {
			subreddits: [
				{
					name: 'test',
					img: undefined,
					description: 'test'
				}
			],
			isLoadingSubreddits: false,
			hasError: false
		}

		expect(subredditsReducer(undefined, {})).toEqual(expState);
	});
});

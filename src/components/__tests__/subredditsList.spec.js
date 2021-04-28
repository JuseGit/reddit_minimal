import React from 'react';
import { render } from '@testing-library/react'
import * as ReactReduxHooks from 'react-redux';

import SubredditsList from '../subredditsList.js';


describe('components/subredditsList', () => {

	let useSelectorSpy;

	beforeEach( () => {
		useSelectorSpy = jest.spyOn(ReactReduxHooks, 'useSelector');
	})

	it('renders a subreddit (@testing-library/react)', () => {
		const subreddits = [{name: 'subreddit1'}];
		const subrContentExp = Object.values(subreddits[0]);

		useSelectorSpy.mockReturnValue(subreddits);

		const { getByTestId } = render(<SubredditsList />);
		const subrContent = getByTestId('subrContent').textContent.split(' ');

		expect(subrContent).toEqual(subrContentExp);
	});
});

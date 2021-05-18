import React from 'react';
import { render, screen, fireEvent, within } from '../../test-utils.js';
import * as ReactReduxHooks from 'react-redux';

import SubredditsList from '../subredditsList.js';


describe('components/subredditsList', () => {
	let initialState = {
		subreddits: {
			subreddits: []
		}
	}

	it('renders an empty list if no subreddits available (@testing-library/react)', () => {
		const { getByRole } = render(<SubredditsList />, {initialState: initialState});

		const subrList = getByRole('list');

		expect(subrList.textContent).toBe('No subreddit available.');
	});

	it('renders a list of subreddits (@testing-library/react)', () => {
		initialState.subreddits.subreddits = [{name: 'subreddit1'}];
		const { getByRole } = render(<SubredditsList />, {initialState: initialState});

		const subrList = getByRole( 'list' );
		const { getAllByRole } = within(subrList);
  		const items = getAllByRole('listitem');

		expect(items.length > 0).toBeTruthy();
	});
});

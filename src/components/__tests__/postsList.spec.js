import React from 'react';
import * as ReactReduxHooks from 'react-redux';
import { render, within } from '../../test-utils.js'
import PostsList from '../postsList.js';


describe('components/postsList', () => {
	let initialState = {
		posts : {
			posts: [],
			isLoadingComments: false,
			hasError: false
		}
	}


	it('renders an empty list if no post available (@testing-library/react)', () => {
		const { getByRole } = render(<PostsList />, {initialState: initialState});

		const postsList = getByRole('list');

		expect(postsList.textContent).toBe('No comments available.');
	});

	it('renders a list of posts (@testing-library/react)', () => {
		const posts = [{name: 'Post1', topic: 'User2', postedTime:"12", nComments:"5"}];
		initialState.posts.posts = posts;

		const { getByRole } = render(<PostsList />, {initialState: initialState});

		const postsList = getByRole('list');
		const { getAllByRole } = within(postsList);
  		const items = getAllByRole('listitem');

		expect(items.length > 0).toBeTruthy();
	});
});

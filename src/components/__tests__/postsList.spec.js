import React from 'react';
import * as ReactReduxHooks from 'react-redux';
import { render, within } from '../../test-utils.js'
import PostsList from '../postsList.js';


describe('components/postsList', () => {
	let initialState = {
		subreddits: {
			subreddits: [],
			currentSubreddit: undefined
		},
		posts: {
			posts: [],
			isLoadingPosts: false,
			hasError: false
		}
	}


	it('renders an empty list if no post available (@testing-library/react)', () => {
		const { getByRole } = render(<PostsList />, {initialState: initialState});

		const postsList = getByRole('list');

		expect(postsList.textContent).toBe('No posts available.');
	});

	it('renders a list of posts (@testing-library/react)', () => {
		const time_frame = { name: 'hours', val: 3 };

		const localInit = {
			...initialState,
			posts: {
				posts: [{name: 'Post1', topic: 'User2', time_frame: time_frame, num_comments:5}]
			}
		}

		const { getByRole } = render(<PostsList />, {initialState: localInit});

		const postsList = getByRole('list');
		const { getAllByRole } = within(postsList);
  		const items = getAllByRole('listitem');

		expect(items.length > 0).toBeTruthy();
	});

	it('renders a list of posts after being fetched (@testing-library/react)', async () => {
		// const posts = [{name: 'Post1', topic: 'User2', time_frame: time_frame, num_comments:5}];
		// initialState.posts.posts = posts;
		const localInit = {
			...initialState,
			subreddits: {
				currentSubreddit: "subredditTest"
			}
		}

		const { getByRole } = render(<PostsList />, {initialState: localInit});

		const postsList = getByRole('list');
		const items = await within(postsList).findAllByRole('listitem');

		expect(items.length > 0).toBeTruthy();
	});
});

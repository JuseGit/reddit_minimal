import React from 'react';
import * as ReactReduxHooks from 'react-redux';
import { render, fireEvent } from '@testing-library/react'
import PostsList from '../postsList.js';


describe('components/postsList', () => {

	let useSelectorSpy;

	beforeEach( () => {
		useSelectorSpy = jest.spyOn(ReactReduxHooks, 'useSelector');
	});


	// it('renders a post item for a subreddit (@testing-library/react)', () => {
	// 	const posts = [{topic: 'Post1', name: 'User2', postedTime:"12", nComments:"5"}];
	// 	const postContentExp = Object.values(posts[0]);
	//
	// 	useSelectorSpy.mockReturnValue(posts);
	//
	// 	const { getByTestId } = render(<PostsList />);
	// 	const postContent = getByTestId('postContent').textContent.split(' ');
	//
	// 	expect(postContent).toEqual(postContentExp);
	// });

	it('shows the comments list (@testing-library/react)', () => {
		const posts = [{topic: 'Post1', name: 'User2', postedTime:"12", nComments:"5"}];

		useSelectorSpy.mockReturnValue(posts);

		const { getByTestId } = render(<PostsList />);
		const showComBtn = getByTestId('show-comments-btn');
		const commentBox = getByTestId('comment-box');
		fireEvent.click(showComBtn);

		expect(commentBox).toBeVisible();
	});
});

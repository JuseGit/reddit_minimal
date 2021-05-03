import React from 'react';
import * as ReactReduxHooks from 'react-redux';
import { render, fireEvent } from '@testing-library/react'
import Post from '../post.js';


describe('components/post', () => {

	it('renders its content (@testing-library/react)', () => {
		const posts = [{topic: 'Post1', name: 'User2', postedTime:"12", nComments:"5"}];
		const postContentExp = Object.values(posts[0]);

		const { getByTestId } = render(<Post name={posts[0].name} topic={posts[0].topic}/>);
		const postContent = getByTestId('post-wrap').textContent.split(' ');

		expect(postContent).toEqual(postContentExp);
	});
});

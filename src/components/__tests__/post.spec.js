import React from 'react';
import * as ReactReduxHooks from 'react-redux';
import { render, screen, fireEvent, within } from '../../test-utils.js';
import Post from '../post.js';


describe('components/post', () => {

	const initialState = {
		comments : {
			comments:  {
				Post1: [{user:'test1', text:'text1'}],
				Post2: [{user:'test2', text:'text2'}],
			},
			isLoadingComments: false,
			hasError: false
		}
	}

	it('renders its content (@testing-library/react)', () => {
		const time_frame = { name: 'hours', val: 3 };
		const posts = [{name: 'Post1', topic: 'User2', postedTime: '3 hours ago', nComments:"5"}];
		let regEx = '';


		Object.values(posts[0]).forEach((item, i, arr) => {
			if( i < (arr.length - 1) ) {
				regEx += `${item}|`;
			} else {
				regEx += `${item}`;
			}
		});

		const postContentExp = new RegExp(regEx, "g");
		const { getByRole } = render ( <Post name={posts[0].name} topic={posts[0].topic}
			 								n_comments={posts[0].nComments} time_frame={time_frame}/>, {initialState: initialState} );
		const postElement = getByRole('article', {name: 'user-post'});

		expect(postElement).toHaveTextContent(postContentExp);
	});

	// it('renders a list of comments (@testing-library/react)', () => {
	// 	const time_frame = { name: 'hours', val: 3 };
	// 	const posts = [{name: 'Post1', topic: 'User2', postedTime: '3 hours ago', nComments:"5"}];
	//
	// 	const { getByRole } = render ( <Post name={posts[0].name} topic={posts[0].topic}
	// 		 								n_comments={posts[0].nComments} time_frame={time_frame}/>, {initialState: initialState} );
	//
	// 	fireEvent.click(screen.getByTestId('show-comments-btn'));
	//
	// 	const commentList = getByRole( 'list' );
	// 	const { getAllByRole } = within(commentList);
  	// 	const items = getAllByRole('listitem');
	//
	// 	expect(items.length > 0).toBeTruthy();
	// });
});

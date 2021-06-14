import React from 'react';
import * as ReactReduxHooks from 'react-redux';
import { render, screen, fireEvent, within } from '../../test-utils.js';
import Post from '../post.js';


describe('components/post', () => {

	const initialState = {
		posts : {
			posts: [],
			isLoadingPosts: false,
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
			 								n_comments={posts[0].nComments} time_frame={time_frame}/>);
		const postElement = getByRole('article', {name: 'user-post'});

		expect(postElement).toHaveTextContent(postContentExp);
	});

	it('renders a list of comments after firing the dispatch (@testing-library/react)', async () => {
		const time_frame = { name: 'hours', val: 3 };
		const posts = [{id: 'postIDtest', subreddit: 'subredditTest', name: 'link_id', topic: 'User2', postedTime: '3 hours ago', nComments:"5"}];

		const { getByRole } = render ( <Post id={posts[0].id} name={posts[0].name} subreddit={posts[0].subreddit} topic={posts[0].topic}
											n_comments={posts[0].nComments} time_frame={time_frame}/> );

		fireEvent.click(screen.getByTestId('show-comments-btn'));

		const commentList = getByRole( 'list' );
		const items = await within(commentList).findAllByRole('listitem');

		expect(items.length > 0).toBeTruthy();
	});
});

import React from 'react';
import * as ReactReduxHooks from 'react-redux';
import { render, within } from '../../test-utils.js'
import CommentsList from '../commentsList.js';


describe('components/commentsList', () => {
	let initialState = {
		comments : {
			comments: {},
			isLoadingComments: false,
			hasError: false
		}
	}


	it('renders an empty list if no comments available (@testing-library/react)', () => {
		const { getByRole } = render(<CommentsList postName="test" />, {initialState: initialState});

		const commentsList = getByRole('list');

		expect(commentsList.textContent).toBe('');
	});

	it('renders a list of comments (@testing-library/react)', () => {
		// const time_frame = { name: 'hours', val: 3 };
		// const comments = {
		// 	postIDtest: [{id: 'idcomment', author: 'authortest', text:'bodytext', time_frame: time_frame}]
		// }
		//
		// initialState.comments.comments = comments;
		const localInit = {
			...initialState,
			comments: {
				comments:  {
					postIDtest: [{id: 'idcomment'}]
				}
			}
		}

		const { getByRole } = render(<CommentsList postName="postIDtest"/>, {initialState: localInit});

		const commentsList = getByRole('list');
		const { getAllByRole } = within(commentsList);
  		const items = getAllByRole('listitem');

		expect(items.length > 0).toBeTruthy();
	});
});

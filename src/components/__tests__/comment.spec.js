import React from 'react';
import { render, screen, fireEvent, within } from '../../test-utils.js';
import Comment from '../comment.js';


describe('components/comment', () => {

	it('renders its content (@testing-library/react)', () => {
		let regEx = "";

		const commentProps = {
			user: "testUser",
			text: "testBodyText",
			created_time: "9 hours ago"
		}

		Object.values(commentProps).forEach((item, i, arr) => {
			if( i < (arr.length - 1) ) {
				regEx += `${item}|`;
			} else {
				regEx += `${item}`;
			}
		});

		const commentContentExp = new RegExp(regEx, "g");

		render ( <Comment user={commentProps.user} text={commentProps.text} created_time={commentProps.created_time} />, {initialState: {comments:{hasLoadedComments:true}}});
		const commentElement = screen.getByRole("user-comment");

		expect(commentElement).toHaveTextContent(commentContentExp);
	});
});

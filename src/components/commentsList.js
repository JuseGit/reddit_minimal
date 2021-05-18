import React from 'react';
import { useSelector } from 'react-redux';
import { selectComments } from '../store/comments/commentsSlice.js';
import Comment from './comment.js'


const CommentsList = ( { postName } ) => {
	const commentsByPostName = useSelector(selectComments);
	const comments = commentsByPostName[postName];

	return (
		<ul>
			{
				comments.map( (comment) =>
					<li key={comment.user} data-testid='postContent'>
						<Comment user={comment.user} text={comment.text} />
					</li>
				)
			}
		</ul>
	);
}


export default CommentsList;

import React from 'react';
import { useSelector } from 'react-redux';
import { selectComments } from '../store/comments/commentsSlice.js';
import Comment from './comment.js'
import * as styles from './commentsList.module.css'


const CommentsList = ( { postName } ) => {
	const commentsByPostName = useSelector(selectComments);
	const comments = commentsByPostName[postName];

	if( comments !== undefined )
		console.log(commentsByPostName);

	return (
		<ul className={styles.commentsWrapper}>
			{
				comments && comments.map( (comment) =>
					<li key={comment.id} data-testid='postContent'>
						<Comment user={comment.author} text={comment.body} created_time={comment.commented_time} />
					</li>
				)
			}
		</ul>
	);
}


export default CommentsList;

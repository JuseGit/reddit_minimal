import React from 'react';
import { useSelector } from 'react-redux';
import { selectComments, selectHasLoadedComments } from '../store/comments/commentsSlice.js';
import Comment from './comment.js'
import * as styles from './commentsList.module.css'


const CommentsList = ( { postName } ) => {
	const hasLoaded = useSelector(selectHasLoadedComments);
	const commentsByPostName = useSelector(selectComments);
	const comments = commentsByPostName[postName];


	const mapComments = (comments) => {
		if( !hasLoaded ) {
			// if no comments are available yet, render a list of fake comments.
			let dummy_list = [];
			let dummy_item = undefined;

			for ( let i=0; i < 5; i++ ) {
				dummy_item = <li key={`dummy_comment_${i}`} data-testid='commentContent'>
								<Comment />
							 </li>;

				dummy_list.push(dummy_item);
			}

			return dummy_list;
		}

		return comments && comments.map((comment) => <li key={comment.id} data-testid='commentContent'>
														<Comment user={comment.author} text={comment.body} created_time={comment.commented_time} />
													</li>)
	}


	return (
		<ul className={styles.commentsWrapper}>
			{
				// comments && comments.map( (comment) =>
				// 	<li key={comment.id} data-testid='postContent'>
				// 		<Comment user={comment.author} text={comment.body} created_time={comment.commented_time} />
				// 	</li>
				// )
				mapComments(comments)
			}
		</ul>
	);
}


export default CommentsList;

import React from 'react'
import Comment from './comment.js'
import { getTimeDiff, getPostedTime } from '../lib/date_conversions'
import * as styles from './commentsList.module.css'


const CommentsList = ( { isLoading, comments } ) => {
	const mapComments = (comments) => {
		if( isLoading ) {
			// if no comments are available yet, render a list of fake comments.
			let dummy_list = []
			let dummy_item = undefined

			for ( let i=0; i < 5; i++ ) {
				dummy_item = <li key={`dummy_comment_${i}`} data-testid='commentContent'>
								<Comment isLoading={isLoading}/>
							 </li>;

				dummy_list.push(dummy_item)
			}

			return dummy_list
		}

		return (
      comments &&
      comments.map(comment => (
        <li key={comment.data.id} data-testid="commentContent">
          <Comment
            isLoading={isLoading}
            user={comment.data.author}
            text={comment.data.body}
            created_time={getPostedTime(getTimeDiff(comment.data.created_utc))}
          />
        </li>
      ))
    )
	}


	return (
		<ul className={styles.commentsWrapper}>
			{ mapComments(comments)}
		</ul>
	);
}


export default CommentsList;

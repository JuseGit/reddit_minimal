import React, { useState } from 'react';
import * as styles from './comment.module.css'
import ReactMarkdown from 'react-markdown';


const Comment = ({ user, text, created_time }) => {
	return (
		<>
			<div className={styles.comment}>
				<div className={styles.commentMeta} role="user-comment">
					<p className={styles.commentAuthor}>{user ? user : "missing user"}</p>
					<p className={styles.commentTime}>{created_time ? created_time : "missing creation time"}</p>
				</div>

				<div className={styles.commentBody}>
					{text && <ReactMarkdown children={text}/>}
				</div>
			</div>
		</>
	);
}

export default Comment;

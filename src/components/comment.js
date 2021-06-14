import React, { useState } from 'react';
import * as styles from './comment.module.css'
import ReactMarkdown from 'react-markdown';


const Comment = ({ user, text, created_time }) => {
	return (
		<div role="user-comment">
			<p>{user ? user : "missing user"}</p>
			<p>{created_time ? created_time : "missing creation time"}</p>
			{text && <ReactMarkdown children={text}/>}
		</div>
	);
}

export default Comment;

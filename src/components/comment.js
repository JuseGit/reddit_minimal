import React, { useState } from 'react';
//import * as styles from './comment.module.css'


const Comment = ({ user, text }) => {
	return (
		<div>
			{user} {text}
		</div>
	);
}

export default Comment;

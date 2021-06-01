import React, { useState } from 'react';
import * as styles from './post.module.css'
import { StaticImage } from 'gatsby-plugin-image'
import CommentsList from './commentsList.js'



const getPostedTime = (time_frame) => {
	let posted = "n/a";

	switch (time_frame.name) {
		case "seconds":
			posted = (time_frame.val <= 1) ? `${time_frame.val} second ago` : `${time_frame.val} seconds ago`;
			break;

		case "minutes":
			posted = (time_frame.val <= 1) ? `a minute ago` : `${time_frame.val} minutes ago`;
			break;

		case "hours":
			posted = (time_frame.val <= 1) ? `an hour ago` : `${time_frame.val} hours ago`;
			break;

		case "days":
			posted = (time_frame.val <= 1) ? `a day ago` : `${time_frame.val} days ago`;
			break;

		case "months":
			posted = (time_frame.val <= 1) ? `a month ago` : `${time_frame.val} months ago`;
			break;

		case "years":
			posted = (time_frame.val <= 1) ? `a year ago` : `${time_frame.val} years ago`;
			break;

		default: break;
	}

	return posted;
}


const Post = ({ name, topic, time_frame, n_comments }) => {
	const [showCommnetBox, setShowCommentBox] = useState(false);
	let commentBoxStyle = showCommnetBox ? {display: "block", visibility: "visible"} : {display: "none", visibility: "hidden"};
	const posted_time = getPostedTime(time_frame);

	return (
		<div className={styles.postWrapper}>
			<article aria-label="user-post">
				<p className={styles.postTopic}>{topic} </p>
				<hr className={styles.footer_sep} />
				<div className={styles.postFooter}>
					<div style={{height:"100%", alignSelf:"center", border:"2px solid green"}}>{name} </div>
					<div style={{alignSelf:"center", border:"2px solid green"}}> {posted_time} </div>
					<div className={styles.commentBoxBtn} data-testid='show-comments-btn' onClick={() => (setShowCommentBox(!showCommnetBox))}>
						<StaticImage
						  src="../images/gatsby-icon.png"
						  width={25}
						  quality={95}
						  formats={["AUTO", "WEBP", "AVIF"]}
						  alt="A Gatsby astronaut"
						  style={{ borderRadius: "25px", border:"2px solid green", marginRight: "10px", height:"25px", alignSelf:"center"}}
						/>
						<p style={{alignSelf:"center", border:"2px solid green"}}> {n_comments} </p>
					</div>
				</div>
			</article>

			<article className={styles.commentBox} style={commentBoxStyle} aria-label="post-comments">
				{/* <CommentsList postName={name}/> */}
			</article>
		</div>
	);
}

export default Post;

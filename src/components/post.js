import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import * as styles from './post.module.css';
import * as shared from './sharedStyles.module.css';
import { StaticImage } from 'gatsby-plugin-image';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CommentsList from './commentsList.js';
import { getPostedTime } from '../lib/date_conversions.js';
import { fetchComments } from '../store/comments/commentsSlice.js';
import VotesCounter from './votesCounter.js';


const Post = ({ id, name, subreddit, author, topic, time_frame, n_comments, img_url, votes }) => {
	const dispatch = useDispatch();
	const [showCommentBox, setShowCommentBox] = useState(false);
	let commentBoxStyle = showCommentBox ? {display: "block", visibility: "visible"} : {display: "none", visibility: "hidden"};
	const posted_time = getPostedTime(time_frame);
	const comment_btn_style = showCommentBox ? { color: "blue" } : { color: "initial" };
	const comment_btn_class = shared.icon_button + " " + styles.commentBoxBtn;


	useEffect( () => {
		if( showCommentBox !== false ) {
			const postID = id;
			dispatch( fetchComments({postID, subreddit}) );
		}
	}, [dispatch, showCommentBox])

	return (
		<div className={styles.postContainer}>
			<VotesCounter n_votes={votes}/>
			<article className={styles.postWrapper} aria-label="user-post">
				<p className={styles.postTopic}> {topic} </p>
				<div className={styles.postImgWrapper}>
					{ img_url && <LazyLoadImage alt="post image alt" src={img_url} object-fit="cover"/> }
				</div>
				<hr className={styles.footer_sep} />
				<div className={styles.postFooter}>
					<div style={{ color:"#3d5af1", height:"100%", alignSelf:"center"}}> {author} </div>
					<div style={{alignSelf:"center"}}> {posted_time} </div>
					<div className={styles.commentBtnContainer} data-testid='show-comments-btn' onClick={() => setShowCommentBox(!showCommentBox)}>
						<button className={comment_btn_class} style={comment_btn_style}>
							<svg className={shared.icon_svg} version="1.2" baseProfile="tiny" viewBox="0 0 22 22">
								<path d="M18 7c.542 0 1 .458 1 1v7c0 .542-.458 1-1 1h-8.829l-.171.171v-.171h-3c-.542 0-1-.458-1-1v-7c0-.542.458-1 1-1h12m0-2h-12c-1.65 0-3 1.35-3 3v7c0 1.65 1.35 3 3 3h1v3l3-3h8c1.65 0 3-1.35 3-3v-7c0-1.65-1.35-3-3-3z"></path>
							</svg>
						</button>
						<p style={{alignSelf:"center"}}> {n_comments} </p>
					</div>
				</div>

				<div className={styles.commentBox} style={commentBoxStyle} aria-label="post-comments">
					<CommentsList postName={name}/>
				</div>
			</article>

			{/* <article className={styles.commentBox} style={commentBoxStyle} aria-label="post-comments">
				<CommentsList postName={name}/>
			</article> */}
		</div>
	);
}

export default Post;

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import * as styles from './post.module.css';
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
					<div style={{height:"100%", alignSelf:"center", border:"2px solid green"}}> {author} </div>
					<div style={{alignSelf:"center", border:"2px solid green"}}> {posted_time} </div>
					<div className={styles.commentBoxBtn} data-testid='show-comments-btn' onClick={() => setShowCommentBox(!showCommentBox)}>
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
				<CommentsList postName={name}/>
			</article>
		</div>
	);
}

export default Post;

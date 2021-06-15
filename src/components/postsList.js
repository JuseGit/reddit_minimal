import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts, fetchPosts } from '../store/posts/postsSlice.js';
import { selectCurrentSubreddit } from '../store/subreddits/subredditsSlice.js';
import * as styles from './postList.module.css'
import Post from './post.js'


const PostsList = () => {
	const dispatch = useDispatch();
	const posts = useSelector(selectPosts);
	const subreddit = useSelector(selectCurrentSubreddit);


	useEffect( () => {
		if( subreddit !== undefined ) {
			dispatch(fetchPosts(subreddit));
		}
	}, [dispatch, subreddit]);

	const mapPosts = (posts) => {
		if( posts.length === 0 ) {
			return 'No posts available.';
		}

		return posts.map((post) =>	<li key={post.name} className={styles.postWrapper} data-testid='postContent'>
										<Post id={post.id} name={post.name} subreddit={subreddit} author={post.author}
											  topic={post.title} n_comments={post.num_comments}
											  time_frame={post.time_frame} img_url={post.img_url} votes={post.votes}
										 />
									</li>);
	}

	return (
		<section>
			<ul className={styles.listContainer}>
				{mapPosts(posts)}
			</ul>
		</section>
	);
}

export default PostsList;

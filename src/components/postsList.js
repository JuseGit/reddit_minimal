import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPosts, fetchPosts } from '../store/posts/postsSlice.js';
import { selectCurrentSubreddit } from '../store/subreddits/subredditsSlice.js';
import * as styles from './postList.module.css'
import Post from './post.js'
import { selectHasLoadedPosts } from '../store/posts/postsSlice.js';



/**
 *	Renders a list of posts relative to a specific subreddit.
 */
const PostsList = () => {
	const dispatch = useDispatch();
	const posts = useSelector(selectPosts);
	const hasLoaded = useSelector(selectHasLoadedPosts);
	const subreddit = useSelector(selectCurrentSubreddit);


	useEffect( () => {
		if( subreddit !== undefined ) {
			dispatch(fetchPosts(subreddit));
		}
	}, [dispatch, subreddit]);

	// maps posts as list items, using the data available after the fetching procecss.
	const mapPosts = (posts) => {
		if( posts === undefined ) {
			return "Can't load posts!";
		}

		if( !hasLoaded ) {
			// if no posts are available yet, render a list of fake posts.
			let dummy_list = [];
			let dummy_item = undefined;

			for ( let i=0; i < 5; i++ ) {
				dummy_item = <li key={`dummy_post_${i}`} className={styles.postWrapper} data-testid='postContent'>
								<Post />
							 </li>;

				dummy_list.push(dummy_item);
			}

			return dummy_list;
		}

		if( posts.length === 0 ) {
			return "No posts available."
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

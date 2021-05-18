import React from 'react';
import { useSelector } from 'react-redux'
import { selectPosts } from '../store/posts/postsSlice.js';
import * as styles from './postList.module.css'
import Post from './post.js'


const PostsList = () => {
	const posts = useSelector(selectPosts);

	const mapPosts = (posts) => {
		if( posts.length === 0 ) {
			return 'No comments available.';
		}

		return posts.map((post) =>	<li key={post.name} data-testid='postContent'>
										<Post name={post.name} topic={post.topic} />
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

import React from 'react';
import { useSelector } from 'react-redux'
import { selectPosts } from '../store/posts/postsSlice.js';
import * as styles from './postList.module.css'


const PostsList = () => {
	const posts = useSelector(selectPosts);

	return (
		<section>
			<ul className={styles.listContainer}>
				{posts.map((post) => <li key={post.name} className={styles.postItem} data-testid='postContent'>
					<p className={styles.postTopic}>{post.topic} </p>
					<hr className={styles.footer_sep} />
					<div className={styles.postFooter}>
						<p>User2 </p>
						<p>12 </p>
						<p>5</p>
					</div>
				</li>)}
			</ul>
		</section>
	);
}

export default PostsList;

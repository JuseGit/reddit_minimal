import React from 'react';
import { useSelector } from 'react-redux'
import { selectPosts } from '../store/posts/postsSlice.js';


const PostsList = () => {
	const posts = useSelector(selectPosts);

	return (
		<section>
			<ul>
				{posts.map((post) => <li key={post.name} className='item'>{post.name}</li>)}
			</ul>
		</section>
	);
}

export default PostsList;

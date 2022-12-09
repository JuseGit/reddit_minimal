import React from "react"
import * as styles from "./postList.module.css"
import Post from "./post.js"
import { getTimeDiff, format_votes } from "../lib/date_conversions"
import { useGetPostsQuery } from "../store/services/api"

/**
 *	Renders a list of posts relative to a specific subreddit.
 */
const PostsList = ({ subreddit, filterText }) => {
	const { data: posts, error, isLoading } = useGetPostsQuery(subreddit)

	if (error) return "Can't load posts."
	if (isLoading) {
		// if no posts are available yet, render a list of fake posts.
		let dummy_list = []
		let dummy_item = undefined

		for (let i = 0; i < 5; i++) {
			dummy_item = (
				<li
					key={`dummy_post_${i}`}
					className={styles.postWrapper}
					data-testid="dummy-post-listitem"
				>
					<Post isDummy={true} />
				</li>
			)

			dummy_list.push(dummy_item)
		}

		return dummy_list
	}
	if (!posts) return "No posts available."

	// maps posts as list items, using the data available after the fetching procecss.
	const mapPosts = (posts) => {
		const filteredPosts =
			filterText !== ""
				? posts.filter((post) =>
						post.data.title.toLowerCase().includes(filterText.toLowerCase())
				  )
				: posts

		return filteredPosts.map((post) => (
			<li key={post.data.name} className={styles.postWrapper} data-testid="post-listitem">
				<Post
					id={post.data.id}
					name={post.data.name}
					subreddit={subreddit}
					author={post.data.author}
					topic={post.data.title}
					n_comments={post.data.num_comments}
					time_frame={getTimeDiff(post.data.created_utc)}
					img_url={post.data.post_hint !== "image" ? undefined : post.data.url}
					votes={format_votes(post.data.score)}
					isDummy={false}
				/>
			</li>
		))
	}

	return (
		<section>
			<ul className={styles.listContainer}>{mapPosts(posts)}</ul>
		</section>
	)
}

export default PostsList

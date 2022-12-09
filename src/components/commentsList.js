import React from "react"
import Comment from "./comment.js"
import { getTimeDiff, getPostedTime } from "../lib/date_conversions"
import * as styles from "./commentsList.module.css"
import { useGetCommentsQuery } from "../store/services/api"

const CommentsList = ({ subreddit, postID, skip }) => {
	const { data: comments, error, isLoading } = useGetCommentsQuery({ subreddit, postID }, { skip })

	if (error) return "Can't load comments."

	if (isLoading) {
		// if no comments are available yet, render a list of fake comments.
		let dummy_list = []
		let dummy_item = undefined

		for (let i = 0; i < 5; i++) {
			dummy_item = (
				<li key={`dummy_comment_${i}`} data-testid="dummy-comment-listitem">
					<Comment isDummy={true} />
				</li>
			)

			dummy_list.push(dummy_item)
		}

		return dummy_list
	}

	if (!comments) return "No comments available."

	const mapComments = (comments) => {
		return (
			comments &&
			comments.map((comment) => (
				<li key={comment.data.id} data-testid="comment-listitem">
					<Comment
						isDummy={false}
						user={comment.data.author}
						text={comment.data.body}
						created_time={getPostedTime(getTimeDiff(comment.data.created_utc))}
					/>
				</li>
			))
		)
	}

	return <ul className={styles.commentsWrapper}>{mapComments(comments)}</ul>
}

export default CommentsList

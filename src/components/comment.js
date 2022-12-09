import React from "react"
import * as styles from "./comment.module.css"
import ReactMarkdown from "react-markdown"
import * as shared from "./sharedStyles.module.css"

/**
 *  Comment component.
 *	It render the content of a comment written for a post.
 */
const Comment = ({ user, text, created_time, isDummy }) => {
	// Shows a dummy comment for loading effect.
	const dummy_comment = (
		<div className={shared.loading} style={{ display: "flex" }} data-testid="dummy-comment-data">
			<span className={shared.comment_dummy}></span>
		</div>
	)

	return (
		<>
			{isDummy ? (
				dummy_comment
			) : (
				<div className={styles.comment} aria-label="user-comment" data-testid="comment-data">
					<div className={styles.commentMeta}>
						<p className={styles.commentAuthor}>{user ? user : "missing user"}</p>
						<p className={styles.commentTime}>
							{created_time ? created_time : "missing creation time"}
						</p>
					</div>

					<div className={styles.commentBody}>{text && <ReactMarkdown children={text} />}</div>
				</div>
			)}
		</>
	)
}

export default Comment

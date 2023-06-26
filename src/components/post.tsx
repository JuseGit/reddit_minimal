import React, { useState, FC } from "react";
import * as styles from "./post.module.css";
import * as shared from "./sharedStyles.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CommentsList from "./commentsList";
import { TimeDiff, getPostedTime } from "../lib/date_conversions";
import VotesCounter from "./votesCounter";

type PostPlaceholderProps = {
  children?: React.ReactNode;
};

type PostProps = {
  id: string;
  name: string;
  subreddit: string;
  author: string;
  topic: string;
  time_frame: TimeDiff;
  n_comments: number;
  img_url?: string;
  votes: string;
  isDummy: boolean;
};

type CommentsButtonType = {
  onClick?: () => void;
};

/**
 *	Dummy used when the application is fetching data relative to this post.
 */
const PostPlaceholder: FC<PostPlaceholderProps> = ({ children }) => {
  return (
    <div
      className={`${styles.postContainer} ${shared.loading}`}
      data-testid="dummy-post-data"
    >
      <VotesCounter>
        <span className={shared.post_dummy_meta}></span>
      </VotesCounter>
      <article className={styles.postWrapper} aria-label="user-post">
        <div className={styles.postImgWrapper}>
          <span
            className={shared.post_dummy_meta}
            style={{ width: "100%", height: "5em" }}
          />
        </div>
        <hr className={styles.footer_sep} />
        <div className={styles.postFooter}>
          <span className={shared.post_dummy_meta} />
          <span className={shared.post_dummy_meta} />
          <div
            className={styles.commentBtnContainer}
            data-testid="show-comments-btn-p"
          >
            {children}
            <span className={shared.post_dummy_meta} />
          </div>
        </div>
      </article>
    </div>
  );
};

const CommentsButton = ({ onClick }: CommentsButtonType) => {
  const [show, setShow] = useState(false);

  const handleOnClick = () => {
    setShow((prev) => !prev);
    onClick && onClick();
  };

  return (
    <button
      className={`${shared.icon_button} ${styles.commentBoxBtn}`}
      style={show ? { color: "blue" } : { color: "initial" }}
      onClick={handleOnClick}
      data-testid="show-comments-btn"
    >
      <svg
        className={shared.icon_svg}
        version="1.2"
        baseProfile="tiny"
        viewBox="0 0 22 22"
      >
        <path d="M18 7c.542 0 1 .458 1 1v7c0 .542-.458 1-1 1h-8.829l-.171.171v-.171h-3c-.542 0-1-.458-1-1v-7c0-.542.458-1 1-1h12m0-2h-12c-1.65 0-3 1.35-3 3v7c0 1.65 1.35 3 3 3h1v3l3-3h8c1.65 0 3-1.35 3-3v-7c0-1.65-1.35-3-3-3z"></path>
      </svg>
    </button>
  );
};

/**
 * 	Post component. Renders a link in a subreddit.
 */
const Post = ({
  id,
  name,
  subreddit,
  author,
  topic,
  time_frame,
  n_comments,
  img_url,
  votes,
  isDummy,
}: PostProps) => {
  const [skip, setSkip] = useState(true);
  const commentBoxStyle = !skip
    ? ({ display: "block", visibility: "visible" } as const)
    : ({ display: "none", visibility: "hidden" } as const);
  const posted_time = time_frame ? getPostedTime(time_frame) : " ";

  return isDummy ? (
    <PostPlaceholder>
      <CommentsButton />
    </PostPlaceholder>
  ) : (
    <div className={styles.postContainer} data-testid="post-data">
      <VotesCounter>{votes}</VotesCounter>
      <article className={styles.postWrapper} aria-label="user-post">
        <p className={styles.postTopic}>{topic}</p>
        <div className={styles.postImgWrapper}>
          {img_url && (
            <LazyLoadImage
              alt="post image alt"
              src={img_url}
              object-fit="cover"
            />
          )}
        </div>
        <hr className={styles.footer_sep} />
        <div className={styles.postFooter}>
          <div className={styles.postAuthor}> {author} </div>
          <div> {posted_time} </div>
          <div className={styles.commentBtnContainer}>
            <CommentsButton onClick={() => setSkip((prev) => !prev)} />
            <p> {n_comments} </p>
          </div>
        </div>

        <div
          className={styles.commentBox}
          style={commentBoxStyle}
          aria-label="post-comments"
        >
          <CommentsList subreddit={subreddit} postID={id} skip={skip} />
        </div>
      </article>
    </div>
  );
};

export default Post;

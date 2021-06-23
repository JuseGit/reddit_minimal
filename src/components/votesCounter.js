import React, { useState } from 'react';
import * as styles from './votesCounter.module.css';
import * as shared from './sharedStyles.module.css';



const upvote_empty = "M12 21c-1.654 0-3-1.346-3-3v-4.764c-1.143 1.024-3.025.979-4.121-.115-1.17-1.169-1.17-3.073 0-4.242l7.121-7.121 7.121 7.121c1.17 1.169 1.17 3.073 0 4.242-1.094 1.095-2.979 1.14-4.121.115v4.764c0 1.654-1.346 3-3 3zm-1-12.586v9.586c0 .551.448 1 1 1s1-.449 1-1v-9.586l3.293 3.293c.379.378 1.035.378 1.414 0 .391-.391.391-1.023 0-1.414l-5.707-5.707-5.707 5.707c-.391.391-.391 1.023 0 1.414.379.378 1.035.378 1.414 0l3.293-3.293z";
const upvote_full = "M12 3.172l-6.414 6.414c-.781.781-.781 2.047 0 2.828s2.047.781 2.828 0l1.586-1.586v7.242c0 1.104.895 2 2 2 1.104 0 2-.896 2-2v-7.242l1.586 1.586c.391.391.902.586 1.414.586s1.023-.195 1.414-.586c.781-.781.781-2.047 0-2.828l-6.414-6.414z";
const dwvote_empty = "M12 21.312l-7.121-7.121c-1.17-1.17-1.17-3.073 0-4.242 1.094-1.094 2.978-1.138 4.121-.115v-4.834c0-1.654 1.346-3 3-3s3 1.346 3 3v4.834c1.143-1.023 3.027-.979 4.121.115 1.17 1.169 1.17 3.072 0 4.242l-7.121 7.121zm-5-10.242c-.268 0-.518.104-.707.293-.391.39-.391 1.023 0 1.414l5.707 5.707 5.707-5.707c.391-.391.391-1.024 0-1.414-.379-.379-1.035-.379-1.414 0l-3.293 3.293v-9.656c0-.551-.448-1-1-1s-1 .449-1 1v9.656l-3.293-3.293c-.189-.189-.439-.293-.707-.293z";
const dwvote_full = "M18.414 10.656c-.781-.781-2.047-.781-2.828 0l-1.586 1.586v-7.242c0-1.105-.896-2-2-2-1.105 0-2 .895-2 2v7.242l-1.586-1.586c-.781-.781-2.047-.781-2.828 0s-.781 2.047 0 2.828l6.414 6.414 6.414-6.414c.781-.781.781-2.046 0-2.828z";

const VotesCounter = ( {children} ) => {
	const [up_vote, setUpVote] = useState(false);
	const [dw_vote, setDwVote] = useState(false);

	// Set the path and the color for the vote buttons, depending on which one is clicked
	const up_vote_btn_class = shared.icon_button + " " + styles.votes_counter_btn + " " + styles.up_vote;
	const dw_vote_btn_class = shared.icon_button + " " + styles.votes_counter_btn + " " + styles.dw_vote;

	const up_vote_path = up_vote ? upvote_full : upvote_empty;
	const dw_vote_path = dw_vote ? dwvote_full : dwvote_empty;

	const up_vote_btn_style = up_vote ? { color: "green" } : {color: "initial"};
	const dw_vote_btn_style = dw_vote ? { color: "red" } : {color: "initial"};
	const vote_style = up_vote ? { color: "green" } : dw_vote ? { color: "red" } : { color: "initial" };

	const handleUpVoteClick = () => {
		setUpVote(!up_vote);
		setDwVote(false);
	}

	const handleDwVoteClick = () => {
		setDwVote(!dw_vote);
		setUpVote(false);
	}

	return (
		<div className={styles.votes_counter_wrapper}>
			<button className={up_vote_btn_class} onClick={() => handleUpVoteClick()} style={up_vote_btn_style}>
				<svg className={shared.icon_svg} version="1.2" baseProfile="tiny" viewBox="0 0 24 24">
					<path d={up_vote_path}></path>
				</svg>
			</button>
			<span className={styles.vote_cnt} style={vote_style}>{children}</span>
			<button className={dw_vote_btn_class} onClick={() => handleDwVoteClick()} style={dw_vote_btn_style}>
				<svg className={shared.icon_svg} version="1.2" baseProfile="tiny" viewBox="0 0 24 24">
					<path d={dw_vote_path}></path>
				</svg>
			</button>
		</div>
	)
}


export default VotesCounter;

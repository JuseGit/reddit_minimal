import React, { useEffect } from 'react';
import { StaticImage } from 'gatsby-plugin-image'
import { useSelector, useDispatch } from 'react-redux'
import { selectSubreddits, fetchSubreddits } from '../store/subreddits/subredditsSlice.js';
import * as styles from './subredditsList.module.css'


const SubredditsList = () => {
	const dispatch = useDispatch();
	const subreddits = useSelector(selectSubreddits);


	useEffect( () => {
		dispatch(fetchSubreddits());
	}, []);

	const mapSubr = (subreddits) => {
		if( subreddits.length === 0 ) {
			return 'No subreddit available.';
		}

		return subreddits.map((subreddit) => <li key={subreddit.subreddit} className={styles.topicItem} data-testid="subrContent">
												<StaticImage
												  src="../images/gatsby-astronaut.png"
												  width={30}
												  quality={95}
												  formats={["AUTO", "WEBP", "AVIF"]}
												  alt="A Gatsby astronaut"
												  style={{ borderRadius: "20px", border:"2px solid green", marginRight: "10px" }}
												/>
												<p style={{alignSelf:"center"}}>{subreddit.subreddit}</p>
											</li>)
	}

	return (
		<section>
			<h2 className={styles.listTitle}>Subreddits</h2>
			<ul className={styles.listContainer}>
				{mapSubr(subreddits)}
			</ul>
		</section>
	);
}

export default SubredditsList;
